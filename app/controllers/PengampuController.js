import Dosen from '../models/DosenModel.js'
import Matkul from '../models/MatkulModel.js'
import conn from "../config/ConnectDB.js"
import { Pengampu, dataPengampu } from '../models/PengampuModel.js'
import Users from '../../auth/models/UserModel.js'

//Pengampu Controller 
export const getPengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        
        let tahun_akademik = req.params.tahun_akademik

        if (tahun_akademik === undefined) {
            tahun_akademik = '2020-2021'
        }

        const pengampu = await dataPengampu(tahun_akademik)
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
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

export const getPengampuById = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const pengampuId = req.params.id
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
            order: [
                ['matkul', 'ASC']
            ]
        })

        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.id = ?", [pengampuId], function (error, rows, fields) {
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
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
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

export const createPengampu = async (req, res) => {
    try {
        const { id_mk, id_dosen, kelas, tahun_akademik } = req.body

        // checking if dosen, mk, kelas is already
        const isAlready = await Pengampu.findOne({
            where: {
                id_mk, id_dosen, kelas
            }
        })

        if (isAlready) {
            req.flash('pengampumsg', 'Dosen Pengampu sudah tersedia!')
            res.redirect('/formpengampu')
            return res.status(400)
        }

        await Pengampu.create({
            id_mk, id_dosen, kelas, tahun_akademik
        })
        req.flash('pengampumsg', 'Dosen Pengampu berhasil ditambahkan!')
        res.redirect('/pengampu/' + tahun_akademik)
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Update data Pengampu
export const getUpdatePengampu = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const pengampuId = req.params.id
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        const matkul = await Matkul.findAll({
            order: [
                ['matkul', 'ASC']
            ]
        })

        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.id = ?", [pengampuId], function (error, rows, fields) {
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

export const updatePengampu = async (req, res) => {
    try {
        const pengampu = await Pengampu.findOne({
            where: {id: req.params.id}
        })

         // checking pengampu data is not already
        if (!pengampu) return res.status(404).json({ msg: "Data tidak tersedia" })
        
        const { id_mk, id_dosen, kelas, tahun_akademik } = req.body

        // checking if dosen, mk, kelas is already
        const isAlready = await Pengampu.findOne({
            where: {
                id_mk, id_dosen, kelas
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
            where: {id: pengampu.id}
        })

        req.flash('pengampumsg', 'Dosen Pengampu berhasil disimpan!')
        res.redirect('/pengampu/' + tahun_akademik)
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Delete Data Pengampu
export const deletePengampu = async (req, res) => {
    try {
        const pengampu = await Pengampu.findOne({
            where: {
                id: req.params.id
            }
        })
    
        // Checking data is already
        if (!pengampu) return res.status(400).send({ msg: 'Data tidak ditemukan!' })
        
        // Deleting data  ruang
        await Pengampu.destroy({
            where: {
                id: pengampu.id
            }
        })
        req.flash('pengampumsg', 'Dosen Pengampu berhasil dihapus!')
        res.redirect('/pengampu')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}