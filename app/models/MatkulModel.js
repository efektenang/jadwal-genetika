const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')

const { DataTypes } = Sequelize

const Matkul = db.define('t_matkul', {
    kode_mk: {
        type: DataTypes.STRING,
        unique: true
    },
    matkul: {
        type: DataTypes.STRING
    },
    sks: {
        type: DataTypes.STRING
    },
    semester: {
        type: DataTypes.STRING
    },
    jenis: {
        type: DataTypes.STRING
    },
}, { freezeTableName: true })

module.exports = Matkul