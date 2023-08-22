import Dosen from '../models/DosenModel.js'
import Matkul from '../models/MatkulModel.js'
import Ruang from '../models/RuangModel.js'
import Users from '../../auth/models/UserModel.js' 
import { getResult } from '../models/JadwalModel.js'
import { dataPengampu } from '../models/PengampuModel.js'

export const getDashboard = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['id', 'uuid', 'name', 'email', 'role'],
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
