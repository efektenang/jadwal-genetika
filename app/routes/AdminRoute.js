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

router.get('/', verifyUser, adminOnly, getDashboard)

// Manage Dosen Data
router.get('/formdosen', verifyUser, adminOnly, getCreateDosen)
router.get('/editdosen/:id', verifyUser, adminOnly, getEditDosen)

router.get('/dosen', verifyUser, adminOnly, getDosen)
router.get('/dosen/:id', verifyUser, adminOnly, getDosenById)
router.post('/insertdosen', verifyUser, adminOnly, createDosen)
router.post('/updatedosen/:id', verifyUser, adminOnly, updateDosen)
router.post('/deletedosen/:id', verifyUser, adminOnly, deleteDosen)

// Manage Hari Data
router.get('/hari', verifyUser, adminOnly, getHari)

// Manage range waktu Data
router.get('/formwaktu', verifyUser, adminOnly, getCreateWaktu)
router.get('/editwaktu/:id', verifyUser, adminOnly, getUpdateWaktu)

router.get('/waktu', verifyUser, adminOnly, getWaktu)
router.post('/insertwaktu', verifyUser, adminOnly, createWaktu)
router.post('/updatewaktu/:id', verifyUser, adminOnly, updateWaktu)
router.post('/deletewaktu/:id', verifyUser, adminOnly, deleteWaktu)

// Manage Matkul Data
router.get('/formmatkul', verifyUser, adminOnly, getCreateMatkul)
router.get('/editmatkul/:id', verifyUser, adminOnly, getEditMatkul)

router.get('/matkul', verifyUser, adminOnly, getMatkul)
router.get('/matkul/:semester', verifyUser, adminOnly, getMatkul)
router.post('/insertmatkul', verifyUser, adminOnly, createMatkul)
router.post('/updatematkul/:id', verifyUser, adminOnly, updateMatkul)
router.post('/deletematkul/:id', verifyUser, adminOnly, deleteMatkul)

// Manage Data Ruang
router.get('/formruang', verifyUser, adminOnly, getCreateRuang)
router.get('/editruang/:id', verifyUser, adminOnly, getEditRuang)

router.get('/ruang', verifyUser, adminOnly, getRuang)
router.post('/insertruang', verifyUser, adminOnly, createRuang)
router.post('/updateruang/:id', verifyUser, adminOnly, updateRuang)
router.post('/deleteruang/:id', verifyUser, adminOnly, deleteRuang)

// Manage Data Pengampu
router.get('/pengampu', verifyUser, adminOnly, getPengampu)
router.get('/pengampu/:tahun_akademik', verifyUser, adminOnly, getPengampu)
router.get('/formpengampu', verifyUser, adminOnly, getCreatePengampu)
router.get('/editpengampu/:id', verifyUser, adminOnly, getUpdatePengampu)

router.post('/insertpengampu', verifyUser, adminOnly, createPengampu)
router.post('/updatepengampu/:id', verifyUser, adminOnly, updatePengampu)
router.post('/deletepengampu/:id', verifyUser, adminOnly, deletePengampu)

// Manage Waktu tidak bersedia
router.get('/waktu-tidak-bersedia', verifyUser, adminOnly, getJadwalKhusus)
router.get('/waktu-tidak-bersedia/:id', verifyUser, adminOnly, getJadwalKhusus)
router.post('/insert-waktu', verifyUser, adminOnly, inputWaktuKhusus)

// Manage Jadwal Kuliah
router.get('/jadwalkuliah', verifyUser, adminOnly, getJadwal)
router.post('/getprocess', verifyUser, adminOnly, processPenjadwalan)
router.post('/createreport', verifyUser, adminOnly, getJadwalReport)

export default router