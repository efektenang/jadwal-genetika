const Users = require('../../auth/models/UserModel.js')
const conn = require('../config/ConnectDB.js')
const Dosen = require('../models/DosenModel.js')
const Hari = require('../models/HariModel.js')
const WaktuKhusus = require('../models/WaktuKhususModel.js')
const Waktu = require('../models/WaktuModel.js')
const WaktuKhususController = {}

WaktuKhususController.getJadwalKhusus = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
        const dosen = await Dosen.findAll({
            order: ['name']
        })
        const t_hari = await Hari.findAll()
        const waktu = await Waktu.findAll()

        let idDosen = req.params.id

        if ( idDosen === undefined) {
            idDosen = await Dosen.findAll({
                attributes: ['id'],
                order: ['name'],
                limit: 1
            })
            idDosen = JSON.stringify(idDosen[0].id)
        }

        const response = await WaktuKhusus.findAll({
            where: {
                kode_dosen: idDosen
            },
            attributes: ['kode_hari', 'kode_waktu']
        })

            res.render('pagejadwalkhusus/menujadwalkhusus', {
                title: 'Waktu Tidak Bersedia',
                layout: 'layouts/templates',
                idDosen,
                dosen,
                t_hari,
                waktu,
                response,
                user
            })

        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

WaktuKhususController.inputWaktuKhusus = async (req, res) => {
    try {

        const { kode_dosen, kode_hari, kode_waktu, arr_tidak_bersedia, hide_me } = req.body

        if (arr_tidak_bersedia !== undefined) {
            conn.query("DELETE FROM t_waktu_khusus WHERE kode_dosen = ?", [kode_dosen], function (error, row, fields) {
                if (error) throw error
            })

            arr_tidak_bersedia.forEach(arr => {
                let tidak_bersedia = arr.split('-')
    
                conn.query("INSERT INTO t_waktu_khusus(kode_dosen, kode_hari, kode_waktu) VALUES(?, ?, ?)", [tidak_bersedia[0], tidak_bersedia[1], tidak_bersedia[2]], function (error, rows, fields) {
                    if (error) throw error
                })
            })
        } else if (hide_me !== undefined && arr_tidak_bersedia === undefined) {
            conn.query("DELETE FROM t_waktu_khusus WHERE kode_dosen = ?", [kode_dosen], function (error, row, fields) {
                if (error) throw error
            })
        }

        res.redirect(`/waktu-tidak-bersedia/${kode_dosen}`)
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports = WaktuKhususController