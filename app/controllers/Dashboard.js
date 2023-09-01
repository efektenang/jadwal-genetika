const Dosen = require('../models/DosenModel.js')
const Matkul = require('../models/MatkulModel.js')
const Ruang = require('../models/RuangModel.js')
const Users = require('../../auth/models/UserModel.js')
const { getResult } = require('../models/JadwalModel.js')
const { dataPengampu } = require('../models/PengampuModel.js')
const Dashboard = {}

Dashboard.getDashboard = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role', 'prodi'],
            where: {
                uuid: req.session.userId
            }
        })
        const userId = user.id
        const tahun_akademik = '2023-2024'
        const getDosen = await Dosen.findAll({
            where: { userId: user.id }
        })
        const getPengampu = await dataPengampu(tahun_akademik, userId)
        const getMatkul = await Matkul.findAll({
            where: { userId: user.id }
        })
        const getRuang = await Ruang.findAll({
            where: { userId: user.id }
        })
        const result = await getResult(userId)

        res.render('index', {
            title: 'Dashboard',
            layout: 'layouts/templates',
            dosen: getDosen.length,
            pengampu: getPengampu.length,
            matkul: getMatkul.length,
            ruang: getRuang.length,
            msg: req.flash('loginmsg'),
            user,
            result
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = Dashboard
