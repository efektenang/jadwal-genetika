import sequelize from 'sequelize'

// jenis ruang kelas
var praktikum = 'praktek'
var teori = 'teori'
var lab = 'laboratorium'

// buat popuiasi
var jenis_semester
var tahun_akademik
var ukuranPopulasi
var crossOver
var mutasi

var pengampu = new Array()
var individu
var sks
var dosen

var jam
var hari
var id_dosen

// waktu permintaan
var waktu_dosen
var jenis_mk

var ruangLab
var ruangKelas
var logAmbilData
var logInisialisasi

var log
var induk

// if jum'at
var kode_jumat
var range_jumat
var kode_dhuhur
var is_notReady


export const getJadwal = async (req, res) => {
    try {
        res.render('pagejadwal/menujadwal', {
            title: 'Menu Jadwal Kuliah',
            layout: 'layouts/templates'
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
