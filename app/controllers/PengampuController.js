import Pengampu from '../models/PengampuModel.js'
import Dosen from '../models/DosenModel.js'
import Matkul from '../models/MatkulModel.js'

//Pengampu Controller 
export const getPengampu = async (req, res) => {
    try {
        const pengampu = await Pengampu.findAll()
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
        const dosen = await Dosen.findAll()
        const matkul = await Matkul.findAll()
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
        const { matkul, name_pengampu, kelas, tahun_akademik } = req.body
        const savePengampu = await Pengampu.create({
            matkul, name_pengampu, kelas, tahun_akademik
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
        const pengampu = await Pengampu.findOne({
            where: {id: req.params.id}
        })

        if (!pengampu) {
            res.redirect('/pengampu')
        }

        const dosen = await Dosen.findAll()
        const matkul = await Matkul.findAll()
        res.render('pagepengampu/formedit', {
            title: 'Menu Edit Data Pengampu',
            layout: 'layouts/templates',
            id: req.params.id,
            pengampu,
            dosen,
            matkul
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
        
        const { matkul, name_pengampu, kelas, tahun_akademik } = req.body
        await Pengampu.update({
            matkul, name_pengampu, kelas, tahun_akademik
        }, {
            where: {id: pengampu.id}
        })

        res.redirect('/pengampu')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

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