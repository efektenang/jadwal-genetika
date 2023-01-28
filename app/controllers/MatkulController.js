import Matkul from '../models/MatkulModel.js'

// Matkul Controller

export const getMatkul = async (req, res) => {
    try {
        const matkul = await Matkul.findAll()
        res.status(200).send({msg: 'Data Ditemukan!', data: matkul})
    } catch (error) {
        res.status(500).json({msg: error.message, data: null})
    }
}

export const createMatkul = async (req, res) => {
    try {
        const { kode_mk, matkul, sks, semester, jenis } = req.body
        
        // Checking all fields is already
        if (!kode_mk || !matkul || !sks || !semester || !jenis) return res.status(400).send({ msg: 'Data harus terisi semua!' })
        
        const response = await Matkul.create({
            kode_mk, matkul, sks, semester, jenis
        })

        res.status(200).send({msg: "Data Berhasil disimpan!", data: response})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const updateMatkul = async (req, res) => {
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
        res.status(200).send({msg: "Data Berhasil diubah!", data: response})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const deleteMatkul = async (req, res) => {
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
        res.status(200).send({msg: 'Data berhasil dihapus!'})
    } catch (error) {
        res.status(400).send(error.message)
    }
}