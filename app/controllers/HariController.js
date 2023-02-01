import Hari from '../models/HariModel.js'

export const getDashboard = async (req, res) => {
    try {
        res.render('index', {
            title: 'Dashboard',
            layout: 'layouts/templates'
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

// Hari Controller

export const getHari = async (req, res) => {
    try {
        const hari = await Hari.findAll()
        res.render('menuhari', {
            title: 'Daftar Hari',
            layout: 'layouts/templates',
            hari
        })
        res.status(200)
    } catch (error) {
        res.status(400).send({msg: error.message})
    }
}

export const createHari = async (req, res) => {
    try {
        const { hari } = req.body
        const response = await Hari.create({
            hari
        })
        res.status(201).send(response)
    } catch (error) {
        res.status(400).json({msg: 'data gagal dikirim!'})
    }
}