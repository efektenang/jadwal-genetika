import Users from '../../auth/models/UserModel.js'
import Dosen from '../models/DosenModel.js'

// Dosen Controller 
export const getDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })

        const dosen = await Dosen.findAll({
            where: { userId: user.id },
            order: [
                ['name', 'ASC']
            ]
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
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        res.json({
            id: req.params.id,
            oldNidn: req.body.oldNidn,
            dosen,
            user
        })
        res.status(200);
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
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })
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
            nidn, name, phone, userId: user.id
        })

        req.flash('dosenmsg', 'Data Dosen berhasil ditambahkan!')
        res.redirect('/dosen')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}

export const getEditDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        if (!dosen) {
            res.redirect('/dosen')
        }
        res.render('pagedosen/formedit', {
            title: 'Edit Dosen',
            layout: 'layouts/templates',
            id: req.params.id,
            dosenmsg: req.flash('dosenmsg'),
            oldNidn: req.body.oldNidn,
            dosen,
            user
        });
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const { nidn, name, phone } = req.body

        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
        // checking dosen data is already
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })
        

        const nidnDosen = await Dosen.findOne({
            where: { nidn, userId: user.id }
        })

        // checking if kode dosen is already
        if (nidn !== req.body.oldNidn && nidnDosen) {
            req.flash('dosenmsg', 'NIDN sudah digunakan!')
            res.redirect('/editdosen/' + req.params.id)
            return res.status(400)
        }

        await Dosen.update({
            nidn, name, phone
        }, {
            where: { id: dosen.id, userId: user.id }
        })

        req.flash('dosenmsg', 'Data Dosen berhasil diubah!')
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const deleteDosen = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid'],
            where: {
                uuid: req.session.userId
            }
        })

        const dosen = await Dosen.findOne({
            where: {
                id: req.params.id,
                userId: user.id
            }
        })
    
        if (!dosen) return res.status(404).json({ msg: "Data tidak tersedia" })

        await Dosen.destroy({
            where: {
                id: dosen.id,
                userId: user.id
            }
        })
        req.flash('msg', 'Data Dosen berhasil dihapus!')
        res.redirect('/dosen')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}