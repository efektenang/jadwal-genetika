import { Sequelize } from "sequelize"
import conn from "../config/ConnectDB.js"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const WaktuKhusus = db.define('t_waktu_khusus', {
    kode_dosen: {
        type: DataTypes.STRING,
    },
    kode_hari: {
        type: DataTypes.STRING,
    },
    kode_waktu: {
        type: DataTypes.STRING,
    }

})

export default WaktuKhusus