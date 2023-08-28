// import { Sequelize } from "sequelize"
const { Sequelize } = require('sequelize')

const db = new Sequelize('penjadwalan-app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db