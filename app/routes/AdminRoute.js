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
const { verifyUser, adminOnly, staffOnly } = require('../../auth/middleware/AuthUser.js')

const router = express.Router()

router.get('/', verifyUser, Dashboard.getDashboard)
router.get('/dashboard', verifyUser, Dashboard.getDashboard)

// Manage Dosen Data
router.get('/formdosen', verifyUser, DosenController.getCreateDosen)
router.get('/editdosen/:id', verifyUser, DosenController.getEditDosen)

router.get('/dosen', verifyUser, DosenController.getDosen)
router.get('/dosen/:id', verifyUser, DosenController.getDosenById)
router.post('/insertdosen', verifyUser, DosenController.createDosen)
router.post('/updatedosen/:id', verifyUser, DosenController.updateDosen)
router.post('/deletedosen/:id', verifyUser, DosenController.deleteDosen)

// Manage Hari Data
router.get('/hari', verifyUser, HariController.getHari)
router.post('/inserthari', verifyUser, HariController.createHari)

// Manage range waktu Data
router.get('/formwaktu', verifyUser, staffOnly, WaktuController.getCreateWaktu)
router.get('/editwaktu/:id', verifyUser, staffOnly, WaktuController.getUpdateWaktu)

router.get('/waktu', verifyUser, staffOnly, WaktuController.getWaktu)
router.get('/waktu/:id', verifyUser, staffOnly, WaktuController.getWaktuById)
router.post('/insertwaktu', verifyUser, staffOnly, WaktuController.createWaktu)
router.post('/updatewaktu/:id', verifyUser, staffOnly, WaktuController.updateWaktu)
router.post('/deletewaktu/:id', verifyUser, staffOnly, WaktuController.deleteWaktu)

// Manage Matkul Data
router.get('/formmatkul', verifyUser, MatkulController.getCreateMatkul)
router.get('/editmatkul/:id', verifyUser, MatkulController.getEditMatkul)

router.get('/matkul', verifyUser, MatkulController.getMatkul)
router.get('/matkul/:prodi', verifyUser, MatkulController.getMatkulByProdi)
router.get('/matkul/:prodi/:semester', verifyUser, MatkulController.getMatkul)
router.get('/getmatkul/:id', verifyUser, MatkulController.getMatkulById)
router.post('/insertmatkul', verifyUser, MatkulController.createMatkul)
router.post('/updatematkul/:id', verifyUser, MatkulController.updateMatkul)
router.post('/deletematkul/:id', verifyUser, MatkulController.deleteMatkul)

// Manage Data Ruang
router.get('/formruang', verifyUser, staffOnly, RuangController.getCreateRuang)
router.get('/editruang/:id', verifyUser, staffOnly, RuangController.getEditRuang)

router.get('/ruang', verifyUser, staffOnly, RuangController.getRuang)
router.get('/ruang/:id', verifyUser, staffOnly, RuangController.getRuangById)
router.post('/insertruang', verifyUser, staffOnly, RuangController.createRuang)
router.post('/updateruang/:id', verifyUser, staffOnly, RuangController.updateRuang)
router.post('/deleteruang/:id', verifyUser, staffOnly, RuangController.deleteRuang)

// Manage Data Pengampu
router.get('/pengampu', verifyUser, PengampuController.getPengampu)
router.get('/pengampu/:tahun_akademik', verifyUser, PengampuController.getPengampu)
router.get('/formpengampu', verifyUser, PengampuController.getCreatePengampu)
router.get('/getpengampu/:id', verifyUser, PengampuController.getPengampuById)
router.get('/editpengampu/:id', verifyUser, PengampuController.getUpdatePengampu)

router.post('/insertpengampu', verifyUser, PengampuController.createPengampu)
router.post('/updatepengampu/:id', verifyUser, PengampuController.updatePengampu)
router.post('/deletepengampu/:id', verifyUser, PengampuController.deletePengampu)

// Manage Waktu tidak bersedia
router.get('/waktu-tidak-bersedia', verifyUser, staffOnly, WaktuKhususController.getJadwalKhusus)
router.get('/waktu-tidak-bersedia/:id', verifyUser, staffOnly, WaktuKhususController.getJadwalKhusus)
router.post('/insert-waktu', verifyUser, staffOnly, WaktuKhususController.inputWaktuKhusus)

// Manage Jadwal Kuliah
router.get('/jadwalkuliah', verifyUser, staffOnly, JadwalController.getJadwal)
router.post('/getprocess', verifyUser, staffOnly, JadwalController.processPenjadwalan)
router.get('/getreport', JadwalController.getJadwalReport)

module.exports = router