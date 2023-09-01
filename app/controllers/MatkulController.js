import Users from '../../auth/models/UserModel.js'
import Matkul from '../models/MatkulModel.js'

// Matkul Controller
export const getMatkul = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role', 'prodi'],
            where: {
                uuid: req.session.userId
            }
        })

        let smstr = req.params.semester
        let arr_smstr = [1,2,3,4,5,6,7,8]

        if ( smstr === undefined) {
            smstr = arr_smstr[0]
        }
        
        let prodi = req.params.prodi
        let arr_prodi = ['sistem-informasi', 'teknologi-informasi', 'sains-data']
        if (prodi === undefined) {
            prodi = arr_prodi[0]
        }

        if (user.prodi !== req.params.prodi && user.role === 'prodi') {
            res.redirect('/matkul/' + user.prodi + '/' + smstr)
            return res.status(400)
        }

        const matkul = await Matkul.findAll({
            where: {
                prodi,
                semester: smstr,
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
            prodi,
            arr_prodi,
            matkul,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message, data: null})
    }
}

export const getMatkulByProdi = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role', 'prodi'],
            where: {
                uuid: req.session.userId
            }
        })

        let smstr = req.params.semester
        let arr_smstr = [1,2,3,4,5,6,7,8]

        if ( smstr === undefined) {
            smstr = arr_smstr[0]
        }

        if (user.prodi !== req.params.prodi) {
            res.redirect('/')
            return res.status(400)
        }

        const matkul = await Matkul.findAll({
            where: {
                prodi: req.params.prodi,
                semester: smstr,
                userId: user.id
            },
            order: [
                ['matkul', 'ASC']
            ]
        })
        res.render('pagematkul/matkulprodi', {
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
            oldMatkul: req.flash('oldMk'),
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
            attributes: ['id', 'uuid', 'prodi'],
            where: {
                uuid: req.session.userId
            }
        })
        const { kode_mk, matkul, sks, semester, jenis, prodi } = req.body
        
        // Checking all fields must be fill
        if (!kode_mk || !matkul || !sks || !semester || !jenis || !prodi) return res.status(400).send({ msg: 'Data harus terisi semua!' })

        // checking if kode_mk is ready
        const isReady = await Matkul.findOne({
            where: { kode_mk }
        })

        if (isReady) {
            req.flash('matkulmsg', kode_mk + ' sudah terdaftar!')
            req.flash('oldMk', [kode_mk, matkul, sks, semester, jenis, prodi])
            res.redirect('/formmatkul')
            return res.status(400)
        }
        
        const newMatkul = await Matkul.create({
            kode_mk, matkul, sks, semester, jenis, prodi, userId: user.id
        })

        req.flash('matkulmsg', newMatkul.matkul + ' berhasil ditambahkan!')
        res.redirect('/matkul/'+ prodi + '/' + semester)
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
        const { kode_mk, matkul, sks, semester, jenis, prodi } = req.body

        const isReady = await Matkul.findOne({
            where: { kode_mk, userId: user.id }
        })

        if (kode_mk !== req.body.oldMatkul && isReady) {
            req.flash('matkulmsg', 'Kode Mata Kuliah sudah terdaftar!')
            res.redirect('/editmatkul/' + req.params.id)
            return res.status(400)
        }

        await Matkul.update({
            kode_mk, matkul, sks, semester, jenis, prodi
        }, {
            where: {
                id: response.id, userId: user.id
            }
        })
        req.flash('matkulmsg', response.matkul + ' Berhasil diubah!')
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