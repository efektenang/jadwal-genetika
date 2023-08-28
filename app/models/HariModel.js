const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')

const { DataTypes } = Sequelize

const Hari = db.define('t_hari', {
    hari: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true })

module.exports = Hari