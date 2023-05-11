import Users from "../models/UserModel.js"

export const cekMatch = async (email) => {
    const loadEmail = await Users.findAll({
        attributes: ['name', 'email']
    })
    if (loadEmail.email !== email) {
        return email
    }
}