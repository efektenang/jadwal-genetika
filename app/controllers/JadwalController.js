const Users = require('../../auth/models/UserModel.js')
const conn = require('../config/ConnectDB.js')
const GeneticAlgorithm = require('../config/GeneticAlgorithm.js')
const { getResult, resData } = require('../models/JadwalModel.js')
const ExcelJS = require('exceljs')

const JadwalController = {}

JadwalController.getJadwal = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const userId = user.id

        const result = await getResult(userId)

        res.render('pagejadwal/menujadwal', {
            title: 'Menu Proses Jadwal Kuliah',
            layout: 'layouts/templates',
            result,
            user,
            msg: req.flash('msg'),
            danger: req.flash('dangermsg')
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

JadwalController.processPenjadwalan = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })
        
        const userId = user.id
        const {
            jmlh_populasi,
            probabilitas_crossover,
            probabilitas_mutasi,
            jmlh_generasi,
            semester_tipe,
            tahun_akademik
        } = req.body

        const jadwal = await resData(semester_tipe, tahun_akademik, userId)
        
        const start = performance.now()
        if (jadwal.length < 40) {
            req.flash('dangermsg', `Data pada Semester dan Tahun akademik ini Tidak sesuai! Harap isi data terlebih dahulu sesuai dengan syarat`)
            res.redirect('/jadwalkuliah')
            return res.status(400)
        } else {
            const myClass = new GeneticAlgorithm(semester_tipe, tahun_akademik, jmlh_populasi, probabilitas_crossover, probabilitas_mutasi, 5, '4-5-6', 6, userId)

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
                        conn.query("DELETE FROM t_jadwal WHERE userId = ?", [userId], function (error, rows, fields) {
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
                            conn.query("INSERT INTO t_jadwal(id_pengampu, id_jam, id_hari, id_ruang, userId) VALUES (?, ?, ?, ?, ?)", [id_pengampu, id_jam, id_hari, id_ruang, userId], function (error, rows, fields) {
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

        // Generate report to .xlxs file
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        const result = await getResult(userId)

        if (result) {
            worksheet.addRow(['Hari', 'Sesi', 'Jam Kuliah', 'Mata Kuliah', 'SKS', 'Semester', 'Kelas', 'Dosen', 'Ruangan'])
            result.forEach((row, index) => {
                const rowIndex = index + 2
    
                Object.keys(row).forEach((key, colIndex) => {
                    worksheet.getCell(`${String.fromCharCode(65 + colIndex)}${rowIndex}`).value = row[key]
                })
            })

            workbook.xlsx.writeFile('report/jadwal-report.xlsx')
            .then(function () {
            console.log('File tersimpan')
            })
        }
        // end report

        req.flash('msg', `Jadwal telah ditentukan dalam waktu ${timeInSeconds} detik`)
        res.redirect('/jadwalkuliah')
    } catch (error) {
        console.log(error)
        res.redirect('/jadwalkuliah')
    }

}

<<<<<<< HEAD
// downloading the excel report
export const getJadwalReport = async (req, res) => {
=======
JadwalController.getJadwalReport = async (req, res) => {
>>>>>>> 005fad5ea06d417488d6c82a79e6d31664eecc00
    try {
        const filePath = 'report/jadwal-report.xlsx'
  
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=jadwal-report.xlsx');
        
        res.download(filePath);
    } catch (error) { 
        console.log(error.message)
    }
}

module.exports = JadwalController