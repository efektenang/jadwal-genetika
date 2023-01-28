import express from 'express'
import { createDosen, deleteDosen, getDosen, updateDosen } from '../controllers/DosenController.js'
import { getHari } from '../controllers/HariController.js'
import { createMatkul, deleteMatkul, getMatkul, updateMatkul } from '../controllers/MatkulController.js'
import { createRuang, deleteRuang, getRuang, updateRuang } from '../controllers/RuangController.js'
import { createWaktu, deleteWaktu, getWaktu, updateWaktu } from '../controllers/WaktuController.js'

const router = express.Router()

// Manage Dosen Data
router.get('/dosen', getDosen)
router.post('/insertdosen', createDosen)
router.patch('/updatedosen/:id', updateDosen)
router.delete('/deletedosen/:id', deleteDosen)

// Manage Hari Data
router.get('/hari', getHari)

// Manage range waktu Data
router.get('/waktu', getWaktu)
router.post('/insertwaktu', createWaktu)
router.patch('/updatewaktu/:id', updateWaktu)
router.delete('/deletewaktu/:id', deleteWaktu)

// Manage Matkul Data
router.get('/matkul', getMatkul)
router.post('/insertmatkul', createMatkul)
router.patch('/updatematkul/:id', updateMatkul)
router.delete('/deletematkul/:id', deleteMatkul)

// Manage Data Ruang
router.get('/ruang', getRuang)
router.post('/insertruang', createRuang)
router.patch('/updateruang/:id', updateRuang)
router.delete('/deleteruang/:id', deleteRuang)

export default router