import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Pengampu = db.define('t_pengampu', {
    matkul: {
        type: DataTypes.STRING
    },
    name_pengampu: {
        type: DataTypes.STRING
    },
    kelas: {
        type: DataTypes.STRING
    },
    tahun_akademik: {
        type: DataTypes.STRING
    }
}, { freezeTableName: true })

export default Pengampu