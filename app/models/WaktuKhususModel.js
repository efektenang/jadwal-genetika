const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')

const { DataTypes } = Sequelize

const WaktuKhusus = db.define('t_waktu_khusus', {
    kode_dosen: {
        type: DataTypes.STRING,
    },
    kode_hari: {
        type: DataTypes.STRING,
    },
    kode_waktu: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
})

module.exports = WaktuKhusus