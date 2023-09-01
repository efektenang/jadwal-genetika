const Dosen = require('../models/DosenModel.js')
const Matkul = require('../models/MatkulModel.js')
const conn = require('../config/ConnectDB.js')
const { Pengampu, dataPengampu } = require('../models/PengampuModel.js')
const Users = require('../../auth/models/UserModel.js')
const PengampuController = {}

//Pengampu Controller 
PengampuController.getPengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        
        let tahun_akademik = req.params.tahun_akademik

        if (tahun_akademik === undefined) {
            tahun_akademik = '2020-2021'
        }

        let userId = user.id

        const pengampu = await dataPengampu(tahun_akademik, userId)
        const dosen = await Dosen.findAll({
            where: { userId: user.id },
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
            where: { userId: user.id },
            order: [
                ['matkul', 'ASC']
            ]
        })

        res.render('pagepengampu/menupengampu', {
            title: 'Menu Dosen Pengampu',
            layout: 'layouts/templates',
            msg: req.flash('pengampumsg'),
            tahun_akademik,
            pengampu,
            user,
            dosen,
            matkul
        })
        
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

<<<<<<< HEAD
export const getPengampuById = async (req, res) => {
=======
// Create Data Pengampu
PengampuController.getCreatePengampu = async (req, res) => {
>>>>>>> 005fad5ea06d417488d6c82a79e6d31664eecc00
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const userId = user.id
        const pengampuId = req.params.id

        const dosen = await Dosen.findAll({
            where: { userId: user.id},
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
            where: { userId: user.id},
            order: [
                ['matkul', 'ASC']
            ]
        })

        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.id = ? AND a.userId = ?", [pengampuId, userId], function (error, rows, fields) {
            if (error) throw error
            res.json({
                id: req.params.id,
                rows,
                dosen,
                matkul,
                user
            })
        })

        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getCreatePengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findAll({
            where: { userId: user.id},
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
            where: { userId: user.id},
            order: [
                ['matkul', 'ASC']
            ]
        })
        res.render('pagepengampu/formtambah', {
            title: 'Menu Tambah Data Pengampu',
            layout: 'layouts/templates',
            msg: req.flash('pengampumsg'),
            dosen,
            matkul,
            user
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

PengampuController.createPengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const { id_mk, id_dosen, kelas, tahun_akademik } = req.body

        // checking if dosen, mk, kelas is already
        const isAlready = await Pengampu.findOne({
            where: {
                id_mk, id_dosen, kelas, userId: user.id
            }
        })

        if (isAlready) {
            req.flash('pengampumsg', 'Dosen Pengampu sudah tersedia!')
            res.redirect('/formpengampu')
            return res.status(400)
        }

        await Pengampu.create({
            id_mk, id_dosen, kelas, tahun_akademik, userId: user.id
        })
        req.flash('pengampumsg', 'Dosen Pengampu berhasil ditambahkan!')
        res.redirect('/pengampu/' + tahun_akademik)
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Update data Pengampu
PengampuController.getUpdatePengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const userId = user.id
        const pengampuId = req.params.id

        const dosen = await Dosen.findAll({
            where: { userId: user.id},
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
            where: { userId: user.id},
            order: [
                ['matkul', 'ASC']
            ]
        })

        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.id = ? AND a.userId = ?", [pengampuId, userId], function (error, rows, fields) {
            if (error) throw error
            
            res.render('pagepengampu/formedit', {
                title: 'Menu Edit Data Pengampu',
                layout: 'layouts/templates',
                msg: req.flash('pengampumsg'),
                id: req.params.id,
                rows,
                dosen,
                matkul,
                user
            })
        })

        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

PengampuController.updatePengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const pengampu = await Pengampu.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })

         // checking pengampu data is not already
        if (!pengampu) return res.status(404).json({ msg: "Data tidak tersedia" })
        
        const { id_mk, id_dosen, kelas, tahun_akademik } = req.body

        // checking if dosen, mk, kelas is already
        const isAlready = await Pengampu.findOne({
            where: {
                id_mk, id_dosen, kelas, userId: user.id
            }
        })
 
        if (isAlready) {
            req.flash('pengampumsg', 'Dosen Pengampu sudah tersedia!')
            res.redirect('/editpengampu/' + req.params.id)
            return res.status(400)
        }

        await Pengampu.update({
            id_mk, id_dosen, kelas, tahun_akademik
        }, {
            where: {
                id: pengampu.id,
                userId: user.id
            }
        })

        req.flash('pengampumsg', 'Dosen Pengampu berhasil disimpan!')
        res.redirect('/pengampu/' + tahun_akademik)
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Delete Data Pengampu
PengampuController.deletePengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const pengampu = await Pengampu.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
    
        // Checking data is already
        if (!pengampu) return res.status(400).send({ msg: 'Data tidak ditemukan!' })
        
        // Deleting data  ruang
        await Pengampu.destroy({
            where: {
                id: pengampu.id,
                userId: user.id
            }
        })
        req.flash('pengampumsg', 'Dosen Pengampu berhasil dihapus!')
        res.redirect('/pengampu')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}

module.exports = PengampuController