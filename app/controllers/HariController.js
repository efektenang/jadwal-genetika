import Users from '../../auth/models/UserModel.js'
import Hari from '../models/HariModel.js'

// Hari Controller
export const getHari = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const hari = await Hari.findAll()
        res.render('menuhari', {
            title: 'Daftar Hari',
            layout: 'layouts/templates',
            hari,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

export const createHari = async (req, res) => {
    try {
        const { hari } = req.body
        const response = await Hari.create({
            hari
        })
        res.redirect('/hari')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dikirim!'})
    }
}