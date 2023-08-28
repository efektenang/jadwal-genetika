const Dosen = require('../models/DosenModel.js')
const Matkul = require('../models/MatkulModel.js')
const Ruang = require('../models/RuangModel.js')
const Users = require('../../auth/models/UserModel.js')
const { getResult } = require('../models/JadwalModel.js')
const { dataPengampu } = require('../models/PengampuModel.js')
const Dashboard = {}

Dashboard.getDashboard = async (req, res) => {
    try {
        const tahun_akademik = '2023-2024'
        const getDosen = await Dosen.findAll()
        const getPengampu = await dataPengampu(tahun_akademik)
        const getMatkul = await Matkul.findAll()
        const getRuang = await Ruang.findAll()
        const result = await getResult(res)

        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })

        res.render('index', {
            title: 'Dashboard',
            layout: 'layouts/templates',
            dosen: getDosen.length,
            pengampu: getPengampu.length,
            matkul: getMatkul.length,
            ruang: getRuang.length,
            user,
            result
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = Dashboard
