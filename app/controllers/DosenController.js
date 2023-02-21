import Dosen from '../models/DosenModel.js'

// Dosen Controller 
export const getDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        res.render('pagedosen/menudosen', {
            title: 'Menu Dosen',
            layout: 'layouts/templates',
            dosen
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getDosenById = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(dosen)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const getCreateDosen = async (req, res) => {
     try {
         res.render('pagedosen/formtambah', {
            title: 'Menu Tambah Dosen',
            layout: 'layouts/templates',
         })
         res.status(200)
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
        res.redirect('/dosen')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

export const getEditDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        })
        if (!dosen) {
            res.redirect('/dosen')
        }
        res.render('pagedosen/formedit', {
            title: 'Edit Dosen',
            layout: 'layouts/templates',
            id: req.params.id,
            dosen
        });
        res.status(200);
    } catch (error) {
        res.status(500).json({msg: error.message});
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

        res.redirect('/dosen')
        res.status(200)

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
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}