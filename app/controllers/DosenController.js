import Users from '../../auth/models/UserModel.js'
import Dosen from '../models/DosenModel.js'

// Dosen Controller 
export const getDosen = async (req, res) => {
    try {
        const dosen = await Dosen.findAll({
            order: [
                ['name', 'ASC']
            ]
        })

        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })

        res.render('pagedosen/menudosen', {
            title: 'Menu Dosen',
            layout: 'layouts/templates',
            msg: req.flash('dosenmsg'),
            dosen,
            user
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
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
         res.render('pagedosen/formtambah', {
            title: 'Menu Tambah Dosen',
            layout: 'layouts/templates',
            dosenmsg: req.flash('dosenmsg'),
            user
         })
         res.status(200)
     } catch (error) {
        res.status(500).json({msg: error.message})
     }
}

export const createDosen = async (req, res) => {
    try {
        const { nidn, name, phone } = req.body
        const dsn = await Dosen.findOne({
            where: {
                nidn
            }
        })

        if (dsn) {
            req.flash('dosenmsg', 'NIDN sudah digunakan!')
            res.redirect('/formdosen')
            return res.status(400)
        }

        // Create Data
        await Dosen.create({
            nidn, name, phone
        })

        req.flash('msg', 'Data Dosen berhasil ditambahkan!')
        res.redirect('/dosen')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

export const getEditDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findOne({
            where: { id: req.params.id }
        })
        if (!dosen) {
            res.redirect('/dosen')
        }
        // res.render('pagedosen/formedit', {
        //     title: 'Edit Dosen',
        //     layout: 'layouts/templates',
        //     id: req.params.id,
        //     dosen,
        //     user
        // });
        res.json({
            id: req.params.id,
            dosen,
            user
        })
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

        req.flash('msg', 'Data Dosen berhasil diubah!')
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
        req.flash('msg', 'Data Dosen berhasil dihapus!')
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}