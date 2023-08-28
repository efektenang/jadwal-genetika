// import Users from ''
// import Dosen from ''
const Users = require('../../auth/models/UserModel.js')
const Dosen = require('../models/DosenModel.js')

const DosenController = {}
// Dosen Controller 
DosenController.getDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })

        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })

        res.render('pagedosen/menudosen', {
            title: 'Menu Dosen',
            layout: 'layouts/templates',
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
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(dosen)
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
            user
         })
         res.status(200)
     } catch (error) {
        res.status(500).json({msg: error.message})
     }
}

DosenController.createDosen = async (req, res) => {
    try {
        const { nidn, name, phone } = req.body
        
        // Create Data
        const insertDosen = await Dosen.create({
            nidn, name, phone
        })
        res.redirect('/dosen')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

DosenController.getEditDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        })
        if (!dosen) {
            res.redirect('/dosen')
        }
        res.render('pagedosen/formedit', {
            title: 'Edit Dosen',
            layout: 'layouts/templates',
            id: req.params.id,
            dosen,
            user
        });
        res.status(200);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

DosenController.updateDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        })
        // checking dosen data is already
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })
        
        // initialize data
        const { nidn, name, phone } = req.body

        await Dosen.update({
            nidn, name, phone
        }, {
            where: { id: dosen.id}
        })

        res.redirect('/dosen')
        res.status(200)

    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

DosenController.deleteDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id
            }
        })
    
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })

        await Dosen.destroy({
            where: {
                id: dosen.id
            }
        })
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

module.exports = DosenController