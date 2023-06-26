import { Sequelize } from "sequelize"
import db from "../config/Database.js"

const { DataTypes } = Sequelize

const Dosen = db.define('t_dosen', {
    nidn: {
        type: DataTypes.STRING,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    phone: {
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

export default Dosen