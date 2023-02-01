import Ruang from '../models/RuangModel.js'

export const getRuang = async (req, res) => {
    try {
        const ruang = await Ruang.findAll()
        res.render('pageruang/menuruang', {
            title: 'Menu Ruangan Kelas',
            layout: 'layouts/templates',
            ruang
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data tidak ditemukan'})
    }
}

export const getCreateRuang = async (req, res) => {
    try {
        res.render('pageruang/formtambah', {
            title: 'Menu Tambah Ruangan',
            layout: 'layouts/templates',
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const createRuang = async (req, res) => {
    try {
        const { no_ruang, kapasitas, jenis } = req.body
        
        const insertRuang = await Ruang.create({
            no_ruang, kapasitas, jenis
        })
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal ditambahkan'})
    }
}

export const getEditRuang = async (req, res) => {
    try {
        const ruang = await Ruang.findOne({
            where: {
                id: req.params.id
            }
        })

        res.render('pageruang/formedit', {
            title: 'Menu Edit Data Ruangan',
            layout: 'layouts/templates',
            id: req.params.id,
            ruang
        })
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
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
        res.redirect('/ruang')
        res.status(200)
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
        res.redirect('/ruang')
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: 'Data gagal dihapus'})
    }
}