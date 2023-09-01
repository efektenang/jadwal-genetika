// import  from ''
// import  from ''
const Users = require('../../auth/models/UserModel.js')
const Hari = require('../models/HariModel.js')

// Hari Controller
exports.getHari = async (req, res) => {
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

exports.createHari = async (req, res) => {
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