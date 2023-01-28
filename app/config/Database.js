import { Sequelize } from "sequelize"

const db = new Sequelize('penjadwalan-app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db