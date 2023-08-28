const Users = require('../../auth/models/UserModel.js')
const conn = require('../config/ConnectDB.js')
const GeneticAlgorithm = require('../config/GeneticAlgorithm.js')
const { getResult, resData } = require('../models/JadwalModel.js')
const ExcelJS = require('exceljs')

const JadwalController = {}

JadwalController.getJadwal = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })

        const result = await getResult(res)

        res.render('pagejadwal/menujadwal', {
            title: 'Menu Proses Jadwal Kuliah',
            layout: 'layouts/templates',
            result,
            user,
            msg: req.flash('msg')
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

JadwalController.processPenjadwalan = async (req, res) => {
    try {
        const start = performance.now()
        const {
            jmlh_populasi,
            probabilitas_crossover,
            probabilitas_mutasi,
            jmlh_generasi,
            semester_tipe,
            tahun_akademik
        } = req.body
        const jadwal = await resData(semester_tipe, tahun_akademik)
        

        if (jadwal === undefined) {
            
            res.send({msg: 'Tidak ada data Semester dan Tahun akademik! Data ini adalah data Sebelumnya'})
        } else {
            const myClass = new GeneticAlgorithm(semester_tipe, tahun_akademik, jmlh_populasi, probabilitas_crossover, probabilitas_mutasi, 5, '4-5-6', 6)

            myClass.getData()
            myClass.initialize()

            let found = false

            for (let i = 0; i < jmlh_generasi; i++) {
                let fitness = await myClass.countFitness()

                await myClass.selection(fitness)
                await myClass.startCrossover()

                let fitnessAfterMutation = await myClass.mutate()
 
                for (let j = 0; j < fitnessAfterMutation.length; j++) {
                    if (fitnessAfterMutation[j] == 1) {
                        // make empty t_jadwal Table
                        conn.query("TRUNCATE TABLE t_jadwal", function (error, rows, fields) {
                            if (error) throw error
                        }) 

                        let jadwal_kuliah = await myClass.getIndividu(j)
                        console.log(jadwal_kuliah)

                        for (let k = 0; k < jadwal_kuliah.length; k++) {
                            let id_pengampu = jadwal_kuliah[k][0]
                            let id_jam = jadwal_kuliah[k][1]
                            let id_hari = jadwal_kuliah[k][2]
                            let id_ruang = jadwal_kuliah[k][3]

                            // insert data result to t_jadwal table
                            conn.query("INSERT INTO t_jadwal(id_pengampu, id_jam, id_hari, id_ruang) VALUES (?, ?, ?, ?)", [id_pengampu, id_jam, id_hari, id_ruang], function (error, rows, fields) {
                                if (error) {
                                    console.log(error.message)
                                }
                            })
                        }
                        found = true
                    }
                    if (found) break
                }
                if (found) break
            }
            if (!found) {
                throw new Error('Tidak ditemukan solusi')
            }
        }

        const end = performance.now()
        const timeInSeconds = (end - start) / 1000
        req.flash('msg', `Jadwal telah ditentukan dalam waktu ${timeInSeconds} detik`)
        res.redirect('/jadwalkuliah')
    } catch (error) {
        console.log(error)
        res.redirect('/jadwalkuliah')
    }

}

JadwalController.getJadwalReport = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        const result = await getResult(res)

        result.forEach((row, index) => {
            const rowIndex = index + 1

            Object.keys(row).forEach((key, colIndex) => {
                worksheet.getCell(`${String.fromCharCode(65 + colIndex)}${rowIndex}`).value = row[key]
            })
        })

        workbook.xlsx.writeFile('report/jadwal-report.xlsx')
            .then(function () {
            console.log('File tersimpan')
            })
        res.redirect('/')
    } catch (error) { 
        console.log(error.message)
    }
}

module.exports = JadwalController