const Users = require('../../auth/models/UserModel.js')
const Ruang = require('../models/RuangModel.js')
const RuangController = {}

RuangController.getRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const ruang = await Ruang.findAll({
            where: { userId: user.id },
            order: [
                ['no_ruang', 'ASC']
            ]
        })
        res.render('pageruang/menuruang', {
            title: 'Menu Ruangan Kelas',
            layout: 'layouts/templates',
            msg: req.flash('ruangmsg'),
            ruang,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data tidak ditemukan'})
    }
}

<<<<<<< HEAD
export const getRuangById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
    
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
    
        res.json({
            id: req.params.id,
            oldRuang: req.body.oldRuang,
            ruang,
            user
        })
        res.status(200)
    } catch (error) {
        res.send({msg: error.message})
    }
}

export const getCreateRuang = async (req, res) => {
=======
RuangController.getCreateRuang = async (req, res) => {
>>>>>>> 005fad5ea06d417488d6c82a79e6d31664eecc00
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        res.render('pageruang/formtambah', {
            title: 'Menu Tambah Ruangan',
            layout: 'layouts/templates',
            msg: req.flash('ruangmsg'),
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

RuangController.createRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const { no_ruang, kapasitas, jenis } = req.body

        const room = await Ruang.findOne({
            where: {
                no_ruang, userId: user.id
            }
        })

        if (room) {
            req.flash('ruangmsg', 'No Ruang sudah tersedia!')
            res.redirect('/formruang')
            return res.status(400)
        }
        
        const newRuang = await Ruang.create({
            no_ruang, kapasitas, jenis, userId: user.id
        })
        req.flash('ruangmsg', newRuang.no_ruang + ' berhasil ditambahkan!')
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

RuangController.getEditRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

        res.render('pageruang/formedit', {
            title: 'Menu Edit Data Ruangan',
            layout: 'layouts/templates',
            msg: req.flash('ruangmsg'),
            id: req.params.id,
            oldRuang: req.body.oldRuang,
            ruang,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

RuangController.updateRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

        // Checking data is already
        if (!ruang) return res.status(400).send({msg: 'Data tidak ditemukan!'})

        // Update data
        const { no_ruang, kapasitas, jenis } = req.body

        // checking if kode dosen is already

        const noRuang = await Ruang.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

        if (no_ruang !== req.body.oldRuang && noRuang) {
            req.flash('ruangmsg', 'No Ruang sudah tersedia!')
            res.redirect('/editruang/' + req.params.id)
            return res.status(400)
        }

        await Ruang.update({
            no_ruang, kapasitas, jenis
        }, {
            where: {
                id: ruang.id,
                userId: user.id
            }
        })
        req.flash('ruangmsg', ruang.no_ruang + ' berhasil diubah!')
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

RuangController.deleteRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
    
        // Checking data is already
        if (!ruang) return res.status(400).send({ msg: 'Data tidak ditemukan!' })
        
        // Deleting data  ruang
        await Ruang.destroy({
            where: {
                id: ruang.id,
                userId: user.id
            }
        })
        req.flash('ruangmsg', 'Ruang berhasil dihapus!')
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}

module.exports = RuangController