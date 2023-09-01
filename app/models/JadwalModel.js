const conn = require('../config/ConnectDB.js')

function getResult(userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT e.hari as hari, Concat_WS('-', concat('(', g.id), concat((SELECT id FROM t_waktu WHERE id = (SELECT jm.id FROM t_waktu jm WHERE MID(jm.range_waktu,1,5) = MID(g.range_waktu,1,5)) + (c.sks - 1)),')')) as sesi, Concat_WS('-', MID(g.range_waktu,1,5), (SELECT MID(range_waktu,7,5) FROM t_waktu WHERE id = (SELECT jm.id FROM t_waktu jm WHERE MID(jm.range_waktu,1,5) = MID(g.range_waktu,1,5)) + (c.sks - 1))) as jam_kuliah, c.matkul as nama_mk, c.sks as sks, c.semester as semester, b.kelas as kelas, d.name as dosen, f.no_ruang as ruang FROM t_jadwal a LEFT JOIN t_pengampu b ON a.id_pengampu = b.id LEFT JOIN t_matkul c ON b.id_mk = c.id LEFT JOIN t_dosen d ON b.id_dosen = d.id LEFT JOIN t_hari e ON a.id_hari = e.id LEFT JOIN t_ruang f ON a.id_ruang = f.id LEFT JOIN t_waktu g ON a.id_jam = g.id WHERE a.userId = ? AND b.userId = ? AND c.userId = ? AND d.userId = ? AND f.userId = ? AND g.userId = ? order by e.id asc,Jam_Kuliah ASC", [userId, userId, userId, userId, userId, userId], function (error, rows, field) {
            if (error) throw error

            return resolve(rows)
        })
    })
}

function resData(semester_tipe, tahun_akademik, userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT a.id, b.sks, a.id_dosen, b.jenis FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id WHERE b.semester%2 = ? AND a.tahun_akademik = ? AND a.userId = ? AND b.userId = ?", [semester_tipe, tahun_akademik, userId, userId], function (error, rows, fields) {
            if (error) throw error

            return resolve(rows)
        })
    })
}

function getWaktu(userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT id FROM t_waktu WHERE userId = ?", [userId], function (error, rows, fields) {
            if (error) throw error

            return resolve(rows)
        })
    })
}

function getHari(req, res) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT id FROM t_hari", function (error, rows, fields) {
            if (error) throw error

            return resolve(rows)
        })
    })
}

function getRuangReg(userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT id FROM t_ruang WHERE jenis='teori' AND userId = ?", [userId], function (error, rows, fields) {
            if (error) throw error

            return resolve(rows)
        })
    })
}

function getRuangLab(userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT id FROM t_ruang WHERE jenis='praktek' AND userId = ?", [userId], function (error, rows, fields) {
            if (error) throw error

            return resolve(rows)
        })
    })
}

function getWaktuDosen(userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT kode_dosen, CONCAT_WS(':',kode_hari,kode_waktu) as kode_hari_jam FROM t_waktu_khusus WHERE userId = ?", [userId], function (error, rows, fields) {
            if (error) throw error

            return resolve(rows)
        })
    })
}


module.exports = { getResult, resData, getWaktu, getHari, getRuangReg, getRuangLab, getWaktuDosen}