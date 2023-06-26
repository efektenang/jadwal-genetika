import Users from '../../auth/models/UserModel.js'
import Matkul from '../models/MatkulModel.js'

// Matkul Controller

export const getMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
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
                semester: smstr,
                userId: user.id
            },
            order: [
                ['matkul', 'ASC']
            ]
        })
        res.render('pagematkul/menumatkul', {
            title: 'Menu Mata Kuliah',
            layout: 'layouts/templates',
            msg: req.flash('matkulmsg'),
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

export const getMatkulById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const mk = await Matkul.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        if (!mk) {
            res.status(400).json({msg: 'Mata kuliah tidak tersedia!'})
        }

        res.json({
            id: req.params.id,
            oldMatkul: req.body.oldMatkul,
            mk,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getCreateMatkul = async (req, res) => {
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
            msg: req.flash('matkulmsg'),
            user
        })
        res.status(200)
    } catch (error) {
       res.status(500).json({msg: error.message})
    }
}

export const createMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })
        const { kode_mk, matkul, sks, semester, jenis } = req.body
        
        // Checking all fields is already
        if (!kode_mk || !matkul || !sks || !semester || !jenis) return res.status(400).send({ msg: 'Data harus terisi semua!' })

        // checking if kode_mk is ready
        const isReady = await Matkul.findOne({
            where: { kode_mk }
        })

        if (isReady) {
            req.flash('matkulmsg', 'Mata Kuliah sudah terdaftar!')
            res.redirect('/formmatkul')
            return res.status(400)
        }
        
        await Matkul.create({
            kode_mk, matkul, sks, semester, jenis, userId: user.id
        })
        req.flash('matkulmsg', 'Mata Kuliah Baru berhasil ditambahkan!')
        res.redirect('/matkul/'+ semester)
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const getEditMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const mk = await Matkul.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        if (!mk) {
            res.redirect('/matkul')
            res.status(400)
        }
        res.render('pagematkul/formedit', {
            title: 'Edit Mata Kuliah',
            layout: 'layouts/templates',
            msg: req.flash('matkulmsg'),
            oldMatkul: req.body.oldMatkul,
            id: req.params.id,
            mk,
            user
        });
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const response = await Matkul.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

        // Checking Data is already in database
        if (!response) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        
        // Initialize Data
        const { kode_mk, matkul, sks, semester, jenis } = req.body

        const isReady = await Matkul.findOne({
            where: { kode_mk, userId: user.id }
        })

        if (kode_mk !== req.body.oldMatkul && isReady) {
            req.flash('matkulmsg', 'Kode Mata Kuliah sudah terdaftar!')
            res.redirect('/editmatkul/' + req.params.id)
            return res.status(400)
        }

        await Matkul.update({
            kode_mk, matkul, sks, semester, jenis
        }, {
            where: {
                id: response.id, userId: user.id
            }
        })
        req.flash('matkulmsg', 'Mata Kuliah Berhasil disimpan!')
        res.redirect('/matkul/' + semester)
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const deleteMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })
        const response = await Matkul.findOne({
            where: {
                id: req.params.id
            }
        })

        // Checking Data is not ready in database
        if (!response) return res.status(400).send({ msg: 'Data tidak ditemukan' })

        // Deleting Data
        await Matkul.destroy({
            where: {
                id: response.id,
                userId: user.id
            }
        })
        req.flash('matkulmsg', 'Mata Kuliah berhasil dihapus!')
        res.redirect('/matkul')
        res.status(200)
    } catch (error) {
        res.status(400).send(error.message)
    }
}