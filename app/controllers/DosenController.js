import Dosen from '../models/DosenModel.js'

// Dosen Controller 
export const getDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findAll()
        res.status(200).send(dosen)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createDosen = async (req, res) => {
    try {
        const { nidn, name, phone } = req.body
        
        // Create Data
        const insertDosen = await Dosen.create({
            nidn, name, phone
        })
        res.status(201).json({
            msg: "Data Berhasil dikirim!",
            data: insertDosen
        })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

export const updateDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        })
        // checking dosen data is already
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })
        
        // initialize data
        const { nidn, name, phone } = req.body

        await Dosen.update({
            nidn, name, phone
        }, {
            where: { id: dosen.id}
        })
        res.status(200).json({
            msg: "Data berhasil diubah!"
        })

    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id
            }
        })
    
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })

        await Dosen.destroy({
            where: {
                id: dosen.id
            }
        })
        res.status(200).json({msg: 'Data Berhasil dihapus!'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}