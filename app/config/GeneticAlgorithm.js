import { getHari, getRuangLab, getRuangReg, getWaktu, getWaktuDosen, resData } from "../models/JadwalModel.js"

class GeneticAlgorithm {

    constructor(semester_tipe, tahun_akademik, jmlh_populasi, probabilitas_crossover, probabilitas_mutasi, id_jumat, range_jumat, id_dhuhur) {
        this.semester_tipe = parseInt(semester_tipe)
        this.tahun_akademik = parseInt(tahun_akademik)
        this.jmlh_populasi = parseInt(jmlh_populasi)
        this.crossover = probabilitas_crossover
        this.mutasi = parseFloat(probabilitas_mutasi)
        this.id_jumat = parseInt(id_jumat)
        this.range_jumat = range_jumat.split('-')
        this.id_dhuhur = parseInt(id_dhuhur)
        this.pengampu = []
        this.sks = []
        this.dosen = []
        this.jenis_mk = []
        this.jam = []
        this.hari = []
        this.ruangReg = []
        this.ruangLab = []
        this.idDosen = []
        this.waktu_dosen = []
        this.individu = []
        this.induk = []
        this.teori = 'teori'
    }
    
    async getAllData() {
        await resData(this.semester_tipe, this.tahun_akademik)
        await getWaktu()
        await getHari()
        await getRuangLab()
        await getRuangReg()
        await getWaktuDosen()
    }

    async getData() {
        // create array of data pengampu
        const rsData = await resData(this.semester_tipe, this.tahun_akademik)
        for ( let i = 0; i < rsData.length; i++) {
            this.pengampu[i] = parseInt(rsData[i].id)
            this.sks[i] = parseInt(rsData[i].sks)
            this.dosen[i] = parseInt(rsData[i].id_dosen)
            this.jenis_mk[i] = rsData[i].jenis
        }

        // create array range_waktu
        const waktu = await getWaktu()
        for (let i = 0; i < waktu.length; i++) {
            this.jam[i] = parseInt(waktu[i].id)
        }

        // create array of hari
        const idHari = await getHari()
        for (let i = 0; i < idHari.length; i++) {
            this.hari[i] = parseInt(idHari[i].id)
        }

        // create array of ruangan regular and laboratory
        const resRuangReg = await getRuangReg()
        for (let i = 0; i < resRuangReg.length; i++) {
            this.ruangReg[i] = parseInt(resRuangReg[i].id)
        }

        const resRuangLab = await getRuangLab()
        for (let i = 0; i < resRuangLab.length; i++) {
            this.ruangLab[i] = parseInt(resRuangLab[i].id)
        }

        // create array of waktu dosen
        const resWaktuDosen = await getWaktuDosen()
        for (let i = 0; i < resWaktuDosen.length; i++) {
            this.waktu_dosen[i] = []
            this.idDosen[i] = parseInt(resWaktuDosen[i].kode_dosen)
            this.waktu_dosen[i][0] = parseInt(resWaktuDosen[i].kode_dosen)
            this.waktu_dosen[i][1] = resWaktuDosen[i].kode_hari_jam
        }

    } // end getData()

    async initialize() {
        await this.getAllData()
        const jumlah_pengampu = this.pengampu.length
        const jumlah_jam = this.jam.length
        const jumlah_hari = this.hari.length
        const jumlah_ruang_reg = this.ruangReg.length
        const jumlah_ruang_lab = this.ruangLab.length

        for (let i = 0; i < this.jmlh_populasi; i++) {
            this.individu[i] = []
            for (let j = 0; j < jumlah_pengampu; j++) {
                let sks = this.sks[j]
                this.individu[i][j] = []
                this.individu[i][j][0] = j

                // random check if sks is 1
                if (sks == 1) {
                    this.individu[i][j][1] = Math.abs(Math.floor(Math.random() * jumlah_jam ))
                }

                // random check if sks is 2
                if (sks == 2) {
                    this.individu[i][j][1] = Math.abs(Math.floor((Math.random() * jumlah_jam) - 1))
                }

                // random check if sks is 3
                if (sks == 3) {
                    this.individu[i][j][1] = Math.abs(Math.floor((Math.random() * jumlah_jam) - 2))
                }

                // random check if sks is 4
                if (sks == 4) {
                    this.individu[i][j][1] = Math.abs(Math.floor((Math.random() * jumlah_jam) - 3))
                }

                // penetuan hari secara acak
                this.individu[i][j][2] = Math.floor(Math.random() * jumlah_hari)
                
                if (this.jenis_mk[j] === 'teori') {
                    this.individu[i][j][3] = parseInt(this.ruangReg[Math.floor(Math.random() * jumlah_ruang_reg)])
                } else {
                    this.individu[i][j][3] = parseInt(this.ruangLab[Math.floor(Math.random() * jumlah_ruang_lab)])
                }
            }
        }
    } // end initialize()

    async checkFitness(indv) {
        await this.getAllData()
        let penalty = 0

        const hari_jumat = parseInt(this.id_jumat)
        const jumat_0 = parseInt(this.range_jumat[0])
        const jumat_1 = parseInt(this.range_jumat[1])
        const jumat_2 = parseInt(this.range_jumat[2])

        const jumlah_pengampu = this.pengampu.length

        for (let i = 0; i < jumlah_pengampu; i++) {
            const sks = parseInt(this.sks[i])
            const jam_a = parseInt(this.individu[indv][i][1])
            const hari_a = parseInt(this.individu[indv][i][2])
            const ruang_a = parseInt(this.individu[indv][i][3])
            const dosen_a = parseInt(this.dosen[i])

            for (let j = 0; j < jumlah_pengampu; j++) {
                const jam_b = parseInt(this.individu[indv][j][1])
                const hari_b = parseInt(this.individu[indv][j][2])
                const ruang_b = parseInt(this.individu[indv][j][3])
                const dosen_b = parseInt(this.dosen[j])

                // bentrok ruang dan waktu, bentrok dosen
    
                // jika matkul sama, lanjut ke perulangan berikutnya
                if (i == j) continue
                
                // region bentrok ruang dan waktu
                // ketika jam, hari, ruangan sama, maka penalty +1
                if (jam_a == jam_b && hari_a == hari_b && ruang_a == ruang_b) {
                    penalty += 1
                }

                //ketika sks = 2, hari dan ruang sama
                // jam ke-2 = jam ke-1 matkul lain, maka penalty +1
                if (sks >= 2) {
                    if (jam_a + 1 == jam_b && hari_a == hari_b && ruang_a == ruang_b) {
                        penalty += 1
                    }
                }

                //ketika sks = 3, hari dan ruang sama
                // jam ke-3 = jam ke-1 matkul lain, maka penalty +1
                if (sks >= 3) {
                    if (jam_a + 2 == jam_b && hari_a == hari_b && ruang_a == ruang_b) {
                        penalty += 1
                    }
                }

                //ketika sks = 4, hari dan ruang sama
                // jam ke-4 = jam ke-1 matkul lain, maka penalty +1
                if (sks >= 4) {
                    if (jam_a + 3 == jam_b && hari_a == hari_b && ruang_a == ruang_b) {
                        penalty += 1
                    }
                }

                // bentrok dosen
                if (jam_a == jam_b && hari_a == hari_b && dosen_a == dosen_b) {
                    penalty += 1
                }

                if (sks >= 2) {
                    if ((jam_a + 1) == jam_b && hari_a == hari_b && dosen_a == dosen_b) {
                        penalty += 1
                    }
                }

                if (sks >= 3) {
                    if ((jam_a + 2) == jam_b && hari_a == hari_b && dosen_a == dosen_b) {
                        penalty += 1
                    }
                }

                if (sks >= 4) {
                    if ((jam_a + 3) == jam_b && hari_a == hari_b && dosen_a == dosen_b) {
                        penalty += 1
                    }
                }

                // region Bentrok solat jumat
                if ((hari_a + 1) == hari_jumat) {
                    if (sks == 1) {
                        if (
                            (jam_a == (jumat_0 - 1)) ||
                            (jam_a == (jumat_1 - 1)) ||
                            (jam_a == (jumat_2 - 1))
                        ) {
                            penalty += 1
                        }
                    }
                    if (sks == 2) {
                        if (
                            (jam_a == (jumat_0 - 2)) ||
                            (jam_a == (jumat_0 - 1)) ||
                            (jam_a == (jumat_1 - 1)) ||
                            (jam_a == (jumat_2 - 1))
                        ) {
                            penalty += 1
                        }
                    }
                    if (sks == 3) {
                        if (
                            (jam_a == (jumat_0 - 3)) ||
                            (jam_a == (jumat_0 - 2)) ||
                            (jam_a == (jumat_0 - 1)) ||
                            (jam_a == (jumat_1 - 1)) ||
                            (jam_a == (jumat_2 - 1))
                        ) {
                            penalty += 1
                        }
                    }
                    if (sks == 4) {
                        if (
                            (jam_a == (jumat_0 - 4)) ||
                            (jam_a == (jumat_0 - 3)) ||
                            (jam_a == (jumat_0 - 2)) ||
                            (jam_a == (jumat_0 - 1)) ||
                            (jam_a == (jumat_1 - 1)) ||
                            (jam_a == (jumat_2 - 1))
                        ) {
                            penalty += 1
                        }
                    }
                } // end region

                // region bentrok dengan waktu khusus
                
                const jmlh_waktu_khusus = this.idDosen.length

                for (let j = 0; j < jmlh_waktu_khusus; j++) {
                    if (dosen_a == this.idDosen[j]) {
                        const hari_jam = this.waktu_dosen[j][1].split(':')

                        if (this.jam[jam_a] == hari_jam[1] && this.hari[hari_a] == hari_jam[0]) {
                            penalty += 1
                        }
                    }
                }
            }
        }
        
        let fitness = parseFloat(1 / (1 + penalty))
        return fitness
    } // end checkFitness(indv)

    async countFitness() {
        
        let fitness = []
        for (let indv = 0; indv < this.jmlh_populasi; indv++) {
            fitness[indv] = await this.checkFitness(indv)
        }
        return fitness
    } // end countFitness()

    async selection(fitness) {
        let jumlah = 0
        let rank = []

        for (let i = 0; i < this.jmlh_populasi; i++) {
            // proses rank berdasarkan nilai fitness
            rank[i] = 1
            for (let j = 0; j < this.jmlh_populasi; j++) {
                // rank +1, ketika nilai fitness jadwal sekarang lebih dari fitness lain
                const fitnessA = parseFloat(fitness[i])
                const fitnessB = parseFloat(fitness[j])

                if (fitnessA > fitnessB) {
                    rank[i] += 1
                }
            }
            jumlah += rank[i]
        }
        const jmlh_rank = rank.length
        for (let i = 0; i < this.jmlh_populasi; i++) {
            // proses rangking berdasarkan rangking
            const target = Math.floor(Math.random() * jumlah)
            
            let cek = 0
            for (let j = 0; j < jmlh_rank; j++) {
                cek += rank[j]
                if (parseInt(cek) >= parseInt(target)) {
                    this.induk[i] = j
                    break
                }
            }
        }
    } // end selection()

    async startCrossover() {
        try {
            await this.getAllData()
            let max = 0.999999999
    
            let new_individu = []
            const jmlh_pengampu = this.pengampu.length
    
            for (let i = 0; i < this.jmlh_populasi; i += 2) { //perulangan untuk jadwal terpilih
                let b = 0
                new_individu[i] = []
                new_individu[i+1] = []
                
                let cr = Math.random() * max
    
                // two point crossover 
                if (parseFloat(cr) < parseFloat(this.crossover)) {
                    // ketika nilai random < nilai probabilitas crossover, jadwal mengalami pertukaran
    
                    let a = Math.abs(Math.floor((Math.random() * jmlh_pengampu) - 2))
                    while (b <= a) {
                        b = Math.abs(Math.floor((Math.random() * jmlh_pengampu) - 1))
                    }
    
                    // penetapan jadwal baru dari awal sampai titik ke-1
                    for (let j = 0; j < a; j++) {
                        new_individu[i][j] = []
                        new_individu[i+1][j] = []
                        for (let k = 0; k < 4; k++) {
                            // new_individu[i][j][k]
                            new_individu[i][j][k] = this.individu[this.induk[i]][j][k]
                            new_individu[i+1][j][k] = this.individu[this.induk[i+1]][j][k]
                        }
                    }
                    // // penetapan jadwal baru dari awal sampai titik ke-2
                    for (let j = a; j < b; j++) {
                        new_individu[i][j] = []
                        new_individu[i+1][j] = []
                        for (let k = 0; k < 4; k++) {
                            new_individu[i][j][k] = this.individu[this.induk[i+1]][j][k]
                            new_individu[i+1][j][k] = this.individu[this.induk[i]][j][k]
                        }
                    }
                    // // penetapan jadwal baru dari titik kedua sampai titik akhir
                    for (let j = b; j < jmlh_pengampu; j++) {
                        new_individu[i][j] = []
                        new_individu[i+1][j] = []
                        for (let k = 0; k < 4; k++) {
                            new_individu[i][j][k] = this.individu[this.induk[i]][j][k]
                            new_individu[i+1][j][k] = this.individu[this.induk[i+1]][j][k]
                        }
                    }
                } else {   //Ketika nilai random > nilai probabilitas crossover, maka jadwal baru = jadwal terpilih
                    for (let j = 0; j < jmlh_pengampu; j++) {
                        new_individu[i][j] = []
                        new_individu[i+1][j] = []
                        for (let k = 0; k < 4; k++) {
                            new_individu[i][j][k] = this.individu[this.induk[i]][j][k]
                            new_individu[i+1][j][k] = this.individu[this.induk[i+1]][j][k]
                        }
                    }
                }
            }
    
            for (let i = 0; i < this.jmlh_populasi; i += 2) {
                for (let j = 0; j < jmlh_pengampu; j++) {
                    for (let k = 0; k < 4; k++) {
                        this.individu[i][j][k] = new_individu[i][j][k]
                        this.individu[i+1][j][k] = new_individu[i+1][j][k]
                    }
                }
            }
        } catch (error) {
            console.log('Data processing...')
        }
    } // end startCrossover()

    async mutate() {
        await this.getAllData()

        let fitness = []
        let max = 0.999999999

        let r = Math.random() * max
        const jmlh_pengampu = this.pengampu.length
        const jumlah_jam = this.jam.length
        const jumlah_hari = this.hari.length
        const jumlah_ruang_reg = this.ruangReg.length
        const jumlah_ruang_lab = this.ruangLab.length

        for (let i = 0; i < this.jmlh_populasi; i++) {
            // ketika nilai random kurang dari nilai probabiliti mutasi, maka terjadi pergantian komponen

            if (r < this.mutasi) {
                let chrom = Math.floor(Math.random() * jmlh_pengampu)

                let j = parseInt(this.sks[chrom])

                switch (j) {
                    case 1:
                        this.individu[i][chrom][1] = Math.abs(Math.floor(Math.random() * jumlah_jam))
                        break
                    case 2:
                        this.individu[i][chrom][1] = Math.abs(Math.floor((Math.random() * jumlah_jam) - 1))
                        break
                    case 3:
                        this.individu[i][chrom][1] = Math.abs(Math.floor((Math.random() * jumlah_jam) - 2))
                        break
                    case 4:
                        this.individu[i][chrom][1] = Math.abs(Math.floor((Math.random() * jumlah_jam) - 3))
                        break
                }
                // proses pergantian hari
                this.individu[i][chrom][2] = Math.floor(Math.random() * jumlah_hari)

                // proses penggantian ruang
                if (this.jenis_mk[chrom] === this.teori) {
                    this.individu[i][chrom][3] = this.ruangReg[Math.floor(Math.random() * jumlah_ruang_reg)]
                } else {
                    this.individu[i][chrom][3] = this.ruangLab[Math.floor(Math.random() * jumlah_ruang_lab)]
                }
            }
            fitness[i] = await this.checkFitness(i)
        }
        return fitness
    } // end mutate()

    async getIndividu(indv) {
        await this.getAllData()
        let best_solution = []

        for (let j = 0; j < this.pengampu.length; j++) {
            best_solution[j] = []
            best_solution[j][0] = this.pengampu[this.individu[indv][j][0]]
            best_solution[j][1] = this.jam[this.individu[indv][j][1]]
            best_solution[j][2] = this.hari[this.individu[indv][j][2]]
            best_solution[j][3] = this.individu[indv][j][3]
        }
        return best_solution
    } // end getIndividu()
}

export default GeneticAlgorithm