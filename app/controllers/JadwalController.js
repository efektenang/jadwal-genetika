import conn from "../config/ConnectDB.js"
import GeneticAlgorithm from "../config/GeneticAlgorithm.js"
import { getResult, getRuangLab, getRuangReg, resData } from "../models/JadwalModel.js"

export const getJadwal = async (req, res) => {
    try {
        const result = await getResult(res)

        res.render('pagejadwal/menujadwal', {
            title: 'Menu Jadwal Kuliah',
            layout: 'layouts/templates',
            result
        })
        console.log(result)
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const processPenjadwalan = async (req, res) => {
    try {
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
                // console.log(fitnessAfterMutation.length)
                for (let j = 0; j < fitnessAfterMutation.length; j++) {
                    if (fitnessAfterMutation[j] == 1) {
                        conn.query("TRUNCATE TABLE t_jadwal", function (error, rows, fields) {
                            if (error) throw error
                        })

                        // let jadwal_kuliah = [[]]
                        let jadwal_kuliah = await myClass.getIndividu(j)
                        console.log(jadwal_kuliah)

                        for (let k = 0; k < jadwal_kuliah.length; k++) {
                            // jadwal_kuliah[k] = []
                            const id_pengampu = parseInt(jadwal_kuliah[k][0])
                            const id_jam = parseInt(jadwal_kuliah[k][1])
                            const id_hari = parseInt(jadwal_kuliah[k][2])
                            const id_ruang = parseInt(jadwal_kuliah[k][3])
                            conn.query("INSERT INTO t_jadwal(id_pengampu, id_jam, id_hari, id_ruang) VALUES (?, ?, ?, ?)", [id_pengampu, id_jam, id_hari, id_ruang], function (error, rows, fields) {
                                if(error) throw error
                            })
                            // console.log(id_ruang)
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
        res.redirect('/jadwalkuliah')
    } catch (error) {
        console.log(error)
        res.redirect('/jadwalkuliah')
    }

}
