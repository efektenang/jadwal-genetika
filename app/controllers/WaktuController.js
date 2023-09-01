const Users = require('../../auth/models/UserModel.js')
const Waktu = require('../models/WaktuModel.js')
const WaktuController = {}

// Waktu Controller
WaktuController.getWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const waktu = await Waktu.findAll({
            where: { userId: user.id }
        })
        res.render('pagewaktu/menuwaktu', {
            title: 'Menu Waktu Belajar',
            layout: 'layouts/templates',
            msg: req.flash('waktumsg'),
            danger: req.flash('danger'),
            waktu,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

<<<<<<< HEAD
export const getWaktuById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        res.json({
            id: req.params.id,
            waktu,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getCreateWaktu = async (req, res) => {
=======
WaktuController.getCreateWaktu = async (req, res) => {
>>>>>>> 005fad5ea06d417488d6c82a79e6d31664eecc00
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
            msg: req.flash('waktumsg'),
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

WaktuController.createWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const { range_waktu } = req.body

        const waktu = await Waktu.findOne({
            where: {
                range_waktu, userId: user.id
            }
        })

        // checking if range waktu is already
        if (waktu) {
            req.flash('waktumsg', 'Range waktu sudah tersedia!')
            res.redirect('/formwaktu')
            return res.status(400)
        }

        const newWaktu = await Waktu.create({
            range_waktu, userId: user.id
        })
        req.flash('waktumsg', newWaktu.range_waktu + ' berhasil ditambahkan!')
        res.redirect('/waktu')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dikirim!'})
    }
}

WaktuController.getUpdateWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

        res.render('pagewaktu/formedit', {
            title: 'Menu Edit Data Waktu Belajar',
            layout: 'layouts/templates',
            msg: req.flash('waktumsg'),
            id: req.params.id,
            waktu,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

WaktuController.updateWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

        if (!waktu) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        
        const { range_waktu } = req.body
        const isReady = await Waktu.findOne({
            where: {
                range_waktu, userId: user.id
            }
        })

        // checking if range waktu is already
        if (isReady) {
            req.flash('waktumsg', 'Range waktu sudah tersedia!')
            res.redirect('/editwaktu/' + req.params.id)
            return res.status(400)
        }

        await Waktu.update({
            range_waktu
        }, {
            where: {
                id: waktu.id, userId: user.id
            }
        })
        req.flash('waktumsg', waktu.range_waktu + ' berhasil diubah!')
        res.redirect('/waktu')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: 'data gagal diubah!'})
    }
}

WaktuController.deleteWaktu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        if (!waktu) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        await Waktu.destroy({
            where: {
                id: waktu.id,
                userId: user.id
            }
        })
        req.flash('waktumsg', 'Range waktu berhasil terhapus!')
        res.redirect('/waktu')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dihapus!!'})
    }
}

module.exports = WaktuController