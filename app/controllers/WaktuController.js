const Users = require('../../auth/models/UserModel.js')
const Waktu = require('../models/WaktuModel.js')
const WaktuController = {}

// Waktu Controller
WaktuController.getWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const waktu = await Waktu.findAll()
        res.render('pagewaktu/menuwaktu', {
            title: 'Menu Waktu Belajar',
            layout: 'layouts/templates',
            waktu,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

WaktuController.getCreateWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        res.render('pagewaktu/formtambah', {
            title: 'Menu Tambah Data Waktu', 
            layout: 'layouts/templates',
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

WaktuController.createWaktu = async (req, res) => {
    try {
        const { range_waktu } = req.body
        const response = await Waktu.create({
            range_waktu
        })
        res.redirect('/waktu')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dikirim!'})
    }
}

WaktuController.getUpdateWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id
            }
        })
        res.render('pagewaktu/formedit', {
            title: 'Menu Edit Data Waktu Belajar',
            layout: 'layouts/templates',
            id: req.params.id,
            waktu,
            user
        })
    } catch (error) {
        res.status(400).json({msg: 'data gagal dikirim!'})
    }
}

WaktuController.updateWaktu = async (req, res) => {
    try {
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!waktu) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        
        const { range_waktu } = req.body
        await Waktu.update({
            range_waktu
        }, { where: {
                id: waktu.id
            }
        })
        res.redirect('/waktu')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: 'data gagal diubah!'})
    }
}

WaktuController.deleteWaktu = async (req, res) => {
    try {
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!waktu) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        await Waktu.destroy({
            where: {
                id: waktu.id
            }
        })
        res.redirect('/waktu')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dihapus!!'})
    }
}

module.exports = WaktuController