const { Sequelize } = require('sequelize')
const db = require('../config/Database.js')

const { DataTypes } = Sequelize

const Ruang = db.define('t_ruang', {
    no_ruang: {
        type: DataTypes.STRING
    },
    kapasitas: {
        type: DataTypes.STRING
    },
    jenis: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    }
}, {
    freezeTableName: true
})

module.exports = Ruang