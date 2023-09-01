// import Users from ''
// import Dosen from ''
const Users = require('../../auth/models/UserModel.js')
const Dosen = require('../models/DosenModel.js')

const DosenController = {}
// Dosen Controller 
DosenController.getDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role', 'prodi'],
            where: {
                uuid: req.session.userId
            }
        })

        const dosen = await Dosen.findAll({
            where: { userId: user.id },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('pagedosen/menudosen', {
            title: 'Menu Dosen',
            layout: 'layouts/templates',
            msg: req.flash('dosenmsg'),
            dosen,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

DosenController.getDosenById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        res.json({
            id: req.params.id,
            oldNidn: req.body.oldNidn,
            dosen,
            user
        })
        res.status(200);
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

DosenController.getCreateDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
         res.render('pagedosen/formtambah', {
            title: 'Menu Tambah Dosen',
            layout: 'layouts/templates',
            dosenmsg: req.flash('dosenmsg'),
            oldDosen: req.flash('oldDsn'),
            user
         })
         res.status(200)
     } catch (error) {
        res.status(500).json({msg: error.message})
     }
}

DosenController.createDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })
        const { nidn, name, phone } = req.body
        const dsn = await Dosen.findOne({
            where: {
                nidn
            }
        })

        if (dsn) {
            req.flash('dosenmsg', 'NIDN sudah digunakan!')
            req.flash('oldDsn', [nidn, name, phone])
            res.redirect('/formdosen')
            return res.status(400)
        }

        const addDosen = await Dosen.create({
            nidn, name, phone, userId: user.id
        })

        req.flash('dosenmsg', addDosen.name + ' berhasil ditambahkan!')
        res.redirect('/dosen')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

DosenController.getEditDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        if (!dosen) {
            res.redirect('/dosen')
        }
        res.render('pagedosen/formedit', {
            title: 'Edit Dosen',
            layout: 'layouts/templates',
            id: req.params.id,
            dosenmsg: req.flash('dosenmsg'),
            oldNidn: req.body.oldNidn,
            dosen,
            user
        });
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

DosenController.updateDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const { nidn, name, phone } = req.body

        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        // checking dosen data is already
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })
        

        const nidnDosen = await Dosen.findOne({
            where: { nidn, userId: user.id }
        })

        // checking if kode dosen is already
        if (nidn !== req.body.oldNidn && nidnDosen) {
            req.flash('dosenmsg', 'NIDN sudah digunakan!')
            res.redirect('/editdosen/' + req.params.id)
            return res.status(400)
        }

        await Dosen.update({
            nidn, name, phone
        }, {
            where: { id: dosen.id, userId: user.id }
        })

        req.flash('dosenmsg', dosen.name + ' berhasil diubah!')
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

DosenController.deleteDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
    
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })

        await Dosen.destroy({
            where: {
                id: dosen.id,
                userId: user.id
            }
        })
        req.flash('dosenmsg', dosen.name + ' berhasil dihapus!')
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = DosenController