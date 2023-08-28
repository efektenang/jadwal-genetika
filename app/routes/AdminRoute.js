const express = require('express')
const Dashboard = require('../controllers/Dashboard.js')
const DosenController = require('../controllers/DosenController.js')
const HariController = require('../controllers/HariController.js')
const JadwalController = require('../controllers/JadwalController.js')
const MatkulController = require('../controllers/MatkulController.js')
const PengampuController = require('../controllers/PengampuController.js')
const RuangController = require('../controllers/RuangController.js')
const WaktuController = require('../controllers/WaktuController.js')
const WaktuKhususController = require('../controllers/WaktuKhususController.js')
const { verifyUser, adminOnly } = require('../../auth/middleware/AuthUser.js')


const router = express.Router()

router.get('/', verifyUser, Dashboard.getDashboard)

// Manage Dosen Data
router.get('/formdosen', verifyUser, adminOnly, DosenController.getCreateDosen)
router.get('/editdosen/:id', verifyUser, adminOnly, DosenController.getEditDosen)

router.get('/dosen', verifyUser, DosenController.getDosen)
router.get('/dosen/:id', verifyUser, adminOnly, DosenController.getDosenById)
router.post('/insertdosen', verifyUser, adminOnly, DosenController.createDosen)
router.post('/updatedosen/:id', verifyUser, adminOnly, DosenController.updateDosen)
router.post('/deletedosen/:id', verifyUser, adminOnly, DosenController.deleteDosen)

// Manage Hari Data
router.get('/hari', verifyUser, HariController.getHari)

// Manage range waktu Data
router.get('/formwaktu', verifyUser, adminOnly, WaktuController.getCreateWaktu)
router.get('/editwaktu/:id', verifyUser, adminOnly, WaktuController.getUpdateWaktu)

router.get('/waktu', verifyUser, WaktuController.getWaktu)
router.post('/insertwaktu', verifyUser, adminOnly, WaktuController.createWaktu)
router.post('/updatewaktu/:id', verifyUser, adminOnly, WaktuController.updateWaktu)
router.post('/deletewaktu/:id', verifyUser, adminOnly, WaktuController.deleteWaktu)

// Manage Matkul Data
router.get('/formmatkul', verifyUser, adminOnly, MatkulController.getCreateMatkul)
router.get('/editmatkul/:id', verifyUser, adminOnly, MatkulController.getEditMatkul)

router.get('/matkul', verifyUser, MatkulController.getMatkul)
router.get('/matkul/:semester', verifyUser, MatkulController.getMatkul)
router.post('/insertmatkul', verifyUser, adminOnly, MatkulController.createMatkul)
router.post('/updatematkul/:id', verifyUser, adminOnly, MatkulController.updateMatkul)
router.post('/deletematkul/:id', verifyUser, adminOnly, MatkulController.deleteMatkul)

// Manage Data Ruang
router.get('/formruang', verifyUser, adminOnly, RuangController.getCreateRuang)
router.get('/editruang/:id', verifyUser, adminOnly, RuangController.getEditRuang)

router.get('/ruang', verifyUser, RuangController.getRuang)
router.post('/insertruang', verifyUser, adminOnly, RuangController.createRuang)
router.post('/updateruang/:id', verifyUser, adminOnly, RuangController.updateRuang)
router.post('/deleteruang/:id', verifyUser, adminOnly, RuangController.deleteRuang)

// Manage Data Pengampu
router.get('/pengampu', verifyUser, PengampuController.getPengampu)
router.get('/pengampu/:tahun_akademik', verifyUser, PengampuController.getPengampu)
router.get('/formpengampu', verifyUser, adminOnly, PengampuController.getCreatePengampu)
router.get('/editpengampu/:id', verifyUser, adminOnly, PengampuController.getUpdatePengampu)

router.post('/insertpengampu', verifyUser, adminOnly, PengampuController.createPengampu)
router.post('/updatepengampu/:id', verifyUser, adminOnly, PengampuController.updatePengampu)
router.post('/deletepengampu/:id', verifyUser, adminOnly, PengampuController.deletePengampu)

// Manage Waktu tidak bersedia
router.get('/waktu-tidak-bersedia', verifyUser, WaktuKhususController.getJadwalKhusus)
router.get('/waktu-tidak-bersedia/:id', verifyUser, WaktuKhususController.getJadwalKhusus)
router.post('/insert-waktu', verifyUser, adminOnly, WaktuKhususController.inputWaktuKhusus)

// Manage Jadwal Kuliah
router.get('/jadwalkuliah', verifyUser, JadwalController.getJadwal)
router.post('/getprocess', verifyUser, adminOnly, JadwalController.processPenjadwalan)
router.post('/createreport', verifyUser, JadwalController.getJadwalReport)

module.exports = router