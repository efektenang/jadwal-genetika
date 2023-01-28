import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Hari = db.define('t_hari', {
    hari: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true })

export default Hari