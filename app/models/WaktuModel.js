const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')

const { DataTypes } = Sequelize

const Waktu = db.define('t_waktu', {
    range_waktu: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true })

module.exports = Waktu