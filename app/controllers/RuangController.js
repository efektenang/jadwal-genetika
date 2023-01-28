import Ruang from '../models/RuangModel.js'

export const getRuang = async (req, res) => {
    try {
        const ruang = await Ruang.findAll()
        res.status(200).send({
            msg: 'Data Ruang Ditemukan!',
            data: ruang
        })
    } catch (error) {
        res.status(400).send({msg: 'Data tidak ditemukan'})
    }
}

export const createRuang = async (req, res) => {
    try {
        const { no_ruang, kapasitas, jenis } = req.body
        
        const insertRuang = await Ruang.create({
            no_ruang, kapasitas, jenis
        })
        res.status(200).send({
            msg: 'Data berhasil ditambahkan!',
            data: insertRuang
        })
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

export const updateRuang = async (req, res) => {
    try {
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id
            }
        })

        // Checking data is already
        if (!ruang) return res.status(400).send({msg: 'Data tidak ditemukan!'})

        // Update data
        const { no_ruang, kapasitas, jenis } = req.body
        await Ruang.update({
            no_ruang, kapasitas, jenis
        }, {
            where: {
                id: ruang.id
            }
        })
        res.status(200).send({
            msg: 'Data berhasil diubah!',
            data: {
                no_ruang, kapasitas, jenis
            }
        })
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

export const deleteRuang = async (req, res) => {
    try {
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id
            }
        })
    
        // Checking data is already
        if (!ruang) return res.status(400).send({ msg: 'Data tidak ditemukan!' })
        
        // Deleting data  ruang
        await Ruang.destroy({
            where: {
                id: ruang.id
            }
        })
        res.status(200).send({msg: 'data berhasil dihapus!'})
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}