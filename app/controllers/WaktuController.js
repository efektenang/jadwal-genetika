import Waktu from '../models/WaktuModel.js'

// Hari Controller
export const getWaktu = async (req, res) => {
    try {
        const waktu = await Waktu.findAll()
        res.status(200).send({
            msg: "Data ditemukan!",
            data: waktu
        })
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

export const createWaktu = async (req, res) => {
    try {
        const { range_waktu } = req.body
        const response = await Waktu.create({
            range_waktu
        })
        res.status(201).send(response)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dikirim!'})
    }
}

export const updateWaktu = async (req, res) => {
    try {
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!waktu) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        
        const { range_waktu } = req.body
        await Waktu.update({
            range_waktu
        }, { where: {
                id: waktu.id
            }
        })
        res.status(200).send({
            msg: 'Data berhasil diubah!',
            data: range_waktu
        })
    } catch (error) {
        res.status(400).json({msg: 'data gagal diubah!'})
    }
}

export const deleteWaktu = async (req, res) => {
    try {
        const waktu = await Waktu.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!waktu) return res.status(400).send({ msg: 'Data tidak ditemukan' })
        await Waktu.destroy({
            where: {
                id: waktu.id
            }
        })
        res.status(200).send({mgs: 'Data berhasil dihapus!'})
    } catch (error) {
        res.status(400).json({msg: 'data gagal dihapus!!'})
    }
}