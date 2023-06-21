import express from 'express'
import { getDashboard } from '../controllers/Dashboard.js'
import { createDosen, deleteDosen, getCreateDosen, getDosen, getDosenById, getEditDosen, updateDosen } from '../controllers/DosenController.js'
import { getHari } from '../controllers/HariController.js'
import { getJadwal, getJadwalReport, processPenjadwalan } from '../controllers/JadwalController.js'
import { createMatkul, deleteMatkul, getCreateMatkul, getEditMatkul, getMatkul, updateMatkul } from '../controllers/MatkulController.js'
import { createPengampu, deletePengampu, getCreatePengampu, getPengampu, getUpdatePengampu, updatePengampu } from '../controllers/PengampuController.js'
import { createRuang, deleteRuang, getCreateRuang, getEditRuang, getRuang, updateRuang } from '../controllers/RuangController.js'
import { createWaktu, deleteWaktu, getCreateWaktu, getUpdateWaktu, getWaktu, updateWaktu } from '../controllers/WaktuController.js'
import { getJadwalKhusus, inputWaktuKhusus } from '../controllers/WaktuKhususController.js'
import { adminOnly, verifyUser } from '../../auth/middleware/AuthUser.js'

const router = express.Router()

router.get('/', verifyUser, getDashboard)
router.get('/dashboard', verifyUser, getDashboard)

// Manage Dosen Data
router.get('/formdosen', verifyUser, getCreateDosen)
router.get('/editdosen/:id', verifyUser, getEditDosen)

router.get('/dosen', verifyUser, getDosen)
router.get('/dosen/:id', verifyUser, getDosenById)
router.post('/insertdosen', verifyUser, createDosen)
router.post('/updatedosen/:id', verifyUser, updateDosen)
router.post('/deletedosen/:id', verifyUser, deleteDosen)

// Manage Hari Data
router.get('/hari', verifyUser,  getHari)

// Manage range waktu Data
router.get('/formwaktu', verifyUser, getCreateWaktu)
router.get('/editwaktu/:id', verifyUser, getUpdateWaktu)

router.get('/waktu', verifyUser, getWaktu)
router.post('/insertwaktu', verifyUser, createWaktu)
router.post('/updatewaktu/:id', verifyUser, updateWaktu)
router.post('/deletewaktu/:id', verifyUser, deleteWaktu)

// Manage Matkul Data
router.get('/formmatkul', verifyUser, getCreateMatkul)
router.get('/editmatkul/:id', verifyUser, getEditMatkul)

router.get('/matkul', verifyUser, getMatkul)
router.get('/matkul/:semester', verifyUser, getMatkul)
router.post('/insertmatkul', verifyUser, createMatkul)
router.post('/updatematkul/:id', verifyUser, updateMatkul)
router.post('/deletematkul/:id', verifyUser, deleteMatkul)

// Manage Data Ruang
router.get('/formruang', verifyUser, getCreateRuang)
router.get('/editruang/:id', verifyUser, getEditRuang)

router.get('/ruang', verifyUser, getRuang)
router.post('/insertruang', verifyUser, createRuang)
router.post('/updateruang/:id', verifyUser, updateRuang)
router.post('/deleteruang/:id', verifyUser, deleteRuang)

// Manage Data Pengampu
router.get('/pengampu', verifyUser, getPengampu)
router.get('/pengampu/:tahun_akademik', verifyUser, getPengampu)
router.get('/formpengampu', verifyUser, getCreatePengampu)
router.get('/editpengampu/:id', verifyUser, getUpdatePengampu)

router.post('/insertpengampu', verifyUser, createPengampu)
router.post('/updatepengampu/:id', verifyUser, updatePengampu)
router.post('/deletepengampu/:id', verifyUser, deletePengampu)

// Manage Waktu tidak bersedia
router.get('/waktu-tidak-bersedia', verifyUser, getJadwalKhusus)
router.get('/waktu-tidak-bersedia/:id', verifyUser, getJadwalKhusus)
router.post('/insert-waktu', verifyUser, inputWaktuKhusus)

// Manage Jadwal Kuliah
router.get('/jadwalkuliah', verifyUser, getJadwal)
router.post('/getprocess', verifyUser, processPenjadwalan)
router.get('/getreport', getJadwalReport)

export default router