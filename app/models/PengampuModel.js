import { Sequelize } from "sequelize"
import conn from "../config/ConnectDB.js"
import db from "../config/Database.js"

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
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, { freezeTableName: true })

function dataPengampu(tahun_akademik, userId) {
    return new Promise((resolve, reject) => {
        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, b.prodi as `prodi`, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.tahun_akademik = ? AND a.userId = ? ORDER BY nama_mk ASC", [tahun_akademik, userId], function (error, rows, fields) {
            if (error) return reject(error)

            return resolve(rows)
        })
    })
}

export { Pengampu, dataPengampu }