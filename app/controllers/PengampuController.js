import Dosen from '../models/DosenModel.js'
import Matkul from '../models/MatkulModel.js'
import conn from "../config/ConnectDB.js"
import { Pengampu, dataPengampu } from '../models/PengampuModel.js'

//Pengampu Controller 
export const getPengampu = async (req, res) => {
    try {
        const pengampu = await dataPengampu(res)

        res.render('pagepengampu/menupengampu', {
            title: 'Menu Dosen Pengampu',
            layout: 'layouts/templates',
            pengampu
        })
        
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Create Data Pengampu
export const getCreatePengampu = async (req, res) => {
    try {
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
            dosen,
            matkul
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const createPengampu = async (req, res) => {
    try {
        const { id_mk, id_dosen, kelas, tahun_akademik } = req.body
        const savePengampu = await Pengampu.create({
            id_mk, id_dosen, kelas, tahun_akademik
        })
        res.redirect('/pengampu')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// Update data Pengampu
export const getUpdatePengampu = async (req, res) => {
    try {
        const pengampuId = req.params.id
        const dosen = await Dosen.findAll()
        const matkul = await Matkul.findAll()

        conn.query("SELECT a.id as id, b.id as `id_mk`, b.matkul as `nama_mk`, c.id as `id_dosen`, c.name as `nama_dosen`, a.kelas as kelas, a.tahun_akademik as `tahun_akademik` FROM t_pengampu a LEFT JOIN t_matkul b ON a.id_mk = b.id LEFT JOIN t_dosen c ON a.id_dosen = c.id WHERE a.id = ?", [pengampuId], function (error, rows, fields) {
            if (error) throw error
            
            res.render('pagepengampu/formedit', {
                title: 'Menu Edit Data Pengampu',
                layout: 'layouts/templates',
                id: req.params.id,
                rows,
                dosen,
                matkul
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

         // checking pengampu data is already
        if (!pengampu) return res.status(404).json({ msg: "Data tidak tersedia" })
        
        const { id_mk, id_dosen, kelas, tahun_akademik } = req.body
        await Pengampu.update({
            id_mk, id_dosen, kelas, tahun_akademik
        }, {
            where: {id: pengampu.id}
        })

        res.redirect('/pengampu')
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
        res.redirect('/pengampu')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}