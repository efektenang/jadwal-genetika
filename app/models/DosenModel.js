const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')

const { DataTypes } = Sequelize

const Dosen = db.define('t_dosen', {
    nidn: {
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
}, { freezeTableName: true })

module.exports = Dosen