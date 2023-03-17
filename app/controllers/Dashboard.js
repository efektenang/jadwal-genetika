import Dosen from '../models/DosenModel.js'
import Matkul from '../models/MatkulModel.js'
import Ruang from '../models/RuangModel.js' 
import { getResult } from '../models/JadwalModel.js'
import { dataPengampu } from '../models/PengampuModel.js'

export const getDashboard = async (req, res) => {
    try {
        const getDosen = await Dosen.findAll()
        const getPengampu = await dataPengampu(res)
        const getMatkul = await Matkul.findAll()
        const getRuang = await Ruang.findAll()
        const result = await getResult(res)

        res.render('index', {
            title: 'Dashboard',
            layout: 'layouts/templates',
            dosen: getDosen.length,
            pengampu: getPengampu.length,
            matkul: getMatkul.length,
            ruang: getRuang.length,
            result
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}
