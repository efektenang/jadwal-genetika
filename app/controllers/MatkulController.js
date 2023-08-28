const Users = require('../../auth/models/UserModel.js')
const Matkul = require('../models/MatkulModel.js')
const MatkulController = {}

// Matkul Controller

MatkulController.getMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })

        let smstr = req.params.semester
        let arr_smstr = [1,2,3,4,5,6,7,8]

        if ( smstr === undefined) {
            smstr = arr_smstr[0]
        }
        
        const matkul = await Matkul.findAll({
            where: {
                semester: smstr
            },
            order: [
                ['matkul', 'ASC']
            ]
        })
        res.render('pagematkul/menumatkul', {
            title: 'Menu Mata Kuliah',
            layout: 'layouts/templates',
            arr_smstr,
            smstr,
            matkul,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message, data: null})
    }
}

MatkulController.getCreateMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        res.render('pagematkul/formtambah', {
           title: 'Menu Tambah Mata Kuliah',
            layout: 'layouts/templates',
           user
        })
        res.status(200)
    } catch (error) {
       res.status(500).json({msg: error.message})
    }
}

MatkulController.createMatkul = async (req, res) => {
    try {
        const { kode_mk, matkul, sks, semester, jenis } = req.body
        
        // Checking all fields is already
        if (!kode_mk || !matkul || !sks || !semester || !jenis) return res.status(400).send({ msg: 'Data harus terisi semua!' })
        
        const response = await Matkul.create({
            kode_mk, matkul, sks, semester, jenis
        })

        res.redirect('/matkul/'+ semester)
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

MatkulController.getEditMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const mk = await Matkul.findOne({
            where: { id: req.params.id }
        })
        if (!mk) {
            res.redirect('/matkul')
        }
        res.render('pagematkul/formedit', {
            title: 'Edit Mata Kuliah',
            layout: 'layouts/templates',
            id: req.params.id,
            mk,
            user
        });
        res.status(200);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

MatkulController.updateMatkul = async (req, res) => {
    try {
        const response = await Matkul.findOne({
            where: {
                id: req.params.id
            }
        })

        // Checking Data is already in database
        if (!response) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        
        // Initialize Data
        const { kode_mk, matkul, sks, semester, jenis } = req.body
        await Matkul.update({
            kode_mk, matkul, sks, semester, jenis
        }, {
            where: {
                id: response.id
            }
        })

        res.redirect('/matkul' + semester)
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

MatkulController.deleteMatkul = async (req, res) => {
    try {
        const response = await Matkul.findOne({
            where: {
                id: req.params.id
            }
        })

        // Checking Data is already in database
        if (!response) return res.status(400).send({ msg: 'Data tidak ditemukan' })

        // Deleting Data
        await Matkul.destroy({
            where: {
                id: response.id
            }
        })

        res.redirect('/matkul')
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = MatkulController