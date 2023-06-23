import Users from "../../auth/models/UserModel.js"
import conn from "../config/ConnectDB.js"
import GeneticAlgorithm from "../config/GeneticAlgorithm.js"
import { getResult, resData } from "../models/JadwalModel.js"
import ExcelJS from "exceljs"

export const getJadwal = async (req, res) => {
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

export const processPenjadwalan = async (req, res) => {
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

        // Generate report to .xlxs file
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        conn.query("SELECT e.hari as hari, Concat_WS('-', concat('(', g.id), concat((SELECT id FROM t_waktu WHERE id = (SELECT jm.id FROM t_waktu jm WHERE MID(jm.range_waktu,1,5) = MID(g.range_waktu,1,5)) + (c.sks - 1)),')')) as sesi, Concat_WS('-', MID(g.range_waktu,1,5), (SELECT MID(range_waktu,7,5) FROM t_waktu WHERE id = (SELECT jm.id FROM t_waktu jm WHERE MID(jm.range_waktu,1,5) = MID(g.range_waktu,1,5)) + (c.sks - 1))) as jam_kuliah, c.matkul as nama_mk, c.sks as sks, c.semester as semester, b.kelas as kelas, d.name as dosen, f.no_ruang as ruang FROM t_jadwal a LEFT JOIN t_pengampu b ON a.id_pengampu = b.id LEFT JOIN t_matkul c ON b.id_mk = c.id LEFT JOIN t_dosen d ON b.id_dosen = d.id LEFT JOIN t_hari e ON a.id_hari = e.id LEFT JOIN t_ruang f ON a.id_ruang = f.id LEFT JOIN t_waktu g ON a.id_jam = g.id order by e.id asc,Jam_Kuliah ASC", function (error, rows, field) {
            if (error) throw error

            worksheet.addRow(['Hari', 'Sesi', 'Jam Kuliah', 'Mata Kuliah', 'SKS', 'Semester', 'Kelas', 'Dosen', 'Ruangan'])

            rows.forEach((row, index) => {
                const rowIndex = index + 2 // Start from row 2 to leave room for the column headers
            
                Object.keys(row).forEach((key, colIndex) => {
                  worksheet.getCell(`${String.fromCharCode(65 + colIndex)}${rowIndex}`).value = row[key]
                })
            })

            workbook.xlsx.writeFile('report/jadwal-report.xlsx')
            .then(function () {
            console.log('File tersimpan')
            })
        })

        // const result = await getResult(res)

        // result.forEach((row, index) => {
        //     const rowIndex = index + 1

        //     Object.keys(row).forEach((key, colIndex) => {
        //         worksheet.getCell(`${String.fromCharCode(65 + colIndex)}${rowIndex}`).value = row[key]
        //     })
        // })
        // end report

        req.flash('msg', `Jadwal telah ditentukan dalam waktu ${timeInSeconds} detik`)
        res.redirect('/jadwalkuliah')
    } catch (error) {
        console.log(error)
        res.redirect('/jadwalkuliah')
    }

}

export const getJadwalReport = async (req, res) => {
    try {
        const filePath = 'report/jadwal-report.xlsx'
  
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=jadwal-report.xlsx');
        
        res.download(filePath);
    } catch (error) { 
        console.log(error.message)
    }
}
