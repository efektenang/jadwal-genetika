const Users = require('../../auth/models/UserModel.js')
const Ruang = require('../models/RuangModel.js')
const RuangController = {}

RuangController.getRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const ruang = await Ruang.findAll({
            order: [
                ['no_ruang', 'ASC']
            ]
        })
        res.render('pageruang/menuruang', {
            title: 'Menu Ruangan Kelas',
            layout: 'layouts/templates',
            ruang,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data tidak ditemukan'})
    }
}

RuangController.getCreateRuang = async (req, res) => {
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
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

RuangController.createRuang = async (req, res) => {
    try {
        const { no_ruang, kapasitas, jenis } = req.body
        
        const insertRuang = await Ruang.create({
            no_ruang, kapasitas, jenis
        })
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

RuangController.getEditRuang = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id
            }
        })

        res.render('pageruang/formedit', {
            title: 'Menu Edit Data Ruangan',
            layout: 'layouts/templates',
            id: req.params.id,
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
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id
            }
        })

        // Checking data is already
        if (!ruang) return res.status(400).send({msg: 'Data tidak ditemukan!'})

        // Update data
        const { no_ruang, kapasitas, jenis } = req.body
        await Ruang.update({
            no_ruang, kapasitas, jenis
        }, {
            where: {
                id: ruang.id
            }
        })
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

RuangController.deleteRuang = async (req, res) => {
    try {
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id
            }
        })
    
        // Checking data is already
        if (!ruang) return res.status(400).send({ msg: 'Data tidak ditemukan!' })
        
        // Deleting data  ruang
        await Ruang.destroy({
            where: {
                id: ruang.id
            }
        })
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}

module.exports = RuangController