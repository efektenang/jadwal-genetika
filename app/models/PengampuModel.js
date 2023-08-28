const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')
const conn = require('../config/ConnectDB.js')

const { DataTypes } = Sequelize

const Pengampu = db.define('t_pengampu', {
    id_mk: {
        type: DataTypes.STRING
    },
    id_dosen: {
        type: DataTypes.STRING
    },
    kelas: {
        type: DataTypes.STRING
    },
    tahun_akademik: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true })

function dataPengampu(tahun_akademik) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.tahun_akademik = ? ORDER BY nama_mk ASC", [tahun_akademik], function (error, rows, fields) {
            if (error) return reject(error)

            return resolve(rows)
        })
    })
}

module.exports = { Pengampu, dataPengampu }