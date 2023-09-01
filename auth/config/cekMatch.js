// import Users from "../models/UserModel.js"

const Users = require('../models/UserModel.js')

const cekMatch = async (email) => {
    const loadEmail = await Users.findAll({
        attributes: ['name', 'email']
    })
    if (loadEmail.email !== email) {
        return email
    }
}

module.exports = cekMatch