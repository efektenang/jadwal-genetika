import express from 'express'
import { createDosen, deleteDosen, getCreateDosen, getDosen, getEditDosen, updateDosen } from '../controllers/DosenController.js'
import { getDashboard, getHari } from '../controllers/HariController.js'
import { createMatkul, deleteMatkul, getCreateMatkul, getEditMatkul, getMatkul, updateMatkul } from '../controllers/MatkulController.js'
import { createRuang, deleteRuang, getCreateRuang, getEditRuang, getRuang, updateRuang } from '../controllers/RuangController.js'
import { createWaktu, deleteWaktu, getCreateWaktu, getUpdateWaktu, getWaktu, updateWaktu } from '../controllers/WaktuController.js'

const router = express.Router()

router.get('/', getDashboard)

// Manage Dosen Data
router.get('/formdosen', getCreateDosen)
router.get('/editdosen/:id', getEditDosen)

router.get('/dosen', getDosen)
router.post('/insertdosen', createDosen)
router.post('/updatedosen/:id', updateDosen)
router.post('/deletedosen/:id', deleteDosen)

// Manage Hari Data
router.get('/hari', getHari)

// Manage range waktu Data
router.get('/formwaktu', getCreateWaktu)
router.get('/editwaktu/:id', getUpdateWaktu)

router.get('/waktu', getWaktu)
router.post('/insertwaktu', createWaktu)
router.post('/updatewaktu/:id', updateWaktu)
router.post('/deletewaktu/:id', deleteWaktu)

// Manage Matkul Data
router.get('/formmatkul', getCreateMatkul)
router.get('/editmatkul/:id', getEditMatkul)

router.get('/matkul', getMatkul)
router.post('/insertmatkul', createMatkul)
router.post('/updatematkul/:id', updateMatkul)
router.post('/deletematkul/:id', deleteMatkul)

// Manage Data Ruang
router.get('/formruang', getCreateRuang)
router.get('/editruang/:id', getEditRuang)

router.get('/ruang', getRuang)
router.post('/insertruang', createRuang)
router.post('/updateruang/:id', updateRuang)
router.post('/deleteruang/:id', deleteRuang)

export default router