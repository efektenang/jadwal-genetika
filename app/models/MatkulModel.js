import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Matkul = db.define('t_matkul', {
    kode_mk: {
        type: DataTypes.STRING,
        unique: true
    },
    matkul: {
        type: DataTypes.STRING
    },
    sks: {
        type: DataTypes.STRING
    },
    semester: {
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
}, { freezeTableName: true })

export default Matkul