import express from 'express'
import { getDashboard } from '../controllers/Dashboard.js'
import { createDosen, deleteDosen, getCreateDosen, getDosen, getDosenById, getDosenByProdi, getEditDosen, updateDosen } from '../controllers/DosenController.js'
import { createHari, getHari } from '../controllers/HariController.js'
import { getJadwal, getJadwalReport, processPenjadwalan } from '../controllers/JadwalController.js'
import { createMatkul, deleteMatkul, getCreateMatkul, getEditMatkul, getMatkul, getMatkulById, getMatkulByProdi, updateMatkul } from '../controllers/MatkulController.js'
import { createPengampu, deletePengampu, getCreatePengampu, getPengampu, getPengampuById, getPengampuByProdi, getUpdatePengampu, updatePengampu } from '../controllers/PengampuController.js'
import { createRuang, deleteRuang, getCreateRuang, getEditRuang, getRuang, getRuangById, updateRuang } from '../controllers/RuangController.js'
import { createWaktu, deleteWaktu, getCreateWaktu, getUpdateWaktu, getWaktu, getWaktuById, updateWaktu } from '../controllers/WaktuController.js'
import { getJadwalKhusus, inputWaktuKhusus } from '../controllers/WaktuKhususController.js'
import { staffOnly, verifyUser } from '../../auth/middleware/AuthUser.js'

const router = express.Router()

router.get('/', verifyUser, getDashboard)
router.get('/dashboard', verifyUser, getDashboard)

// Manage Dosen Data
router.get('/formdosen', verifyUser, getCreateDosen)
router.get('/editdosen/:id', verifyUser, getEditDosen)

router.get('/dosen', verifyUser, staffOnly, getDosen)
router.get('/dosen-prodi', verifyUser, getDosenByProdi)
router.get('/dosen/:id', verifyUser, getDosenById)
router.post('/insertdosen', verifyUser, createDosen)
router.post('/updatedosen/:id', verifyUser, updateDosen)
router.post('/deletedosen/:id', verifyUser, deleteDosen)

// Manage Hari Data
router.get('/hari', verifyUser, getHari)
router.post('/inserthari', verifyUser, createHari)

// Manage range waktu Data
router.get('/formwaktu', verifyUser, staffOnly, getCreateWaktu)
router.get('/editwaktu/:id', verifyUser, staffOnly, getUpdateWaktu)

router.get('/waktu', verifyUser, staffOnly, getWaktu)
router.get('/waktu/:id', verifyUser, staffOnly, getWaktuById)
router.post('/insertwaktu', verifyUser, staffOnly, createWaktu)
router.post('/updatewaktu/:id', verifyUser, staffOnly, updateWaktu)
router.post('/deletewaktu/:id', verifyUser, staffOnly, deleteWaktu)

// Manage Matkul Data
router.get('/formmatkul', verifyUser, getCreateMatkul)
router.get('/editmatkul/:id', verifyUser, getEditMatkul)

router.get('/matkul', verifyUser, staffOnly, getMatkul)
router.get('/matkul/:prodi/:semester', verifyUser, staffOnly, getMatkul)
router.get('/matkul-prodi/:prodi', verifyUser, getMatkulByProdi)
router.get('/matkul-prodi/:prodi/:semester', verifyUser, getMatkulByProdi)
router.get('/getmatkul/:id', verifyUser, getMatkulById)
router.post('/insertmatkul', verifyUser, createMatkul)
router.post('/updatematkul/:id', verifyUser, updateMatkul)
router.post('/deletematkul/:id', verifyUser, deleteMatkul)

// Manage Data Ruang
router.get('/formruang', verifyUser, staffOnly, getCreateRuang)
router.get('/editruang/:id', verifyUser, staffOnly, getEditRuang)

router.get('/ruang', verifyUser, staffOnly, getRuang)
router.get('/ruang/:id', verifyUser, staffOnly, getRuangById)
router.post('/insertruang', verifyUser, staffOnly, createRuang)
router.post('/updateruang/:id', verifyUser, staffOnly, updateRuang)
router.post('/deleteruang/:id', verifyUser, staffOnly, deleteRuang)

// Manage Data Pengampu
router.get('/pengampu', verifyUser, staffOnly, getPengampu)
router.get('/pengampu/:tahun_akademik', verifyUser, staffOnly, getPengampu)
router.get('/pengampu-prodi', verifyUser, getPengampuByProdi)
router.get('/pengampu-prodi/:tahun_akademik', verifyUser, getPengampuByProdi)
router.get('/formpengampu', verifyUser, getCreatePengampu)
router.get('/getpengampu/:id', verifyUser, getPengampuById)
router.get('/editpengampu/:id', verifyUser, getUpdatePengampu)

router.post('/insertpengampu', verifyUser, createPengampu)
router.post('/updatepengampu/:id', verifyUser, updatePengampu)
router.post('/deletepengampu/:id', verifyUser, deletePengampu)

// Manage Waktu tidak bersedia
router.get('/waktu-tidak-bersedia', verifyUser, staffOnly, getJadwalKhusus)
router.get('/waktu-tidak-bersedia/:id', verifyUser, staffOnly, getJadwalKhusus)
router.post('/insert-waktu', verifyUser, staffOnly, inputWaktuKhusus)

// Manage Jadwal Kuliah
router.get('/jadwalkuliah', verifyUser, staffOnly, getJadwal)
router.post('/getprocess', verifyUser, staffOnly, processPenjadwalan)
router.get('/getreport', getJadwalReport)

export default router