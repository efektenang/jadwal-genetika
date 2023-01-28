import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Waktu = db.define('t_waktu', {
    range_waktu: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true })

export default Waktu