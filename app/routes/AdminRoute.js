<<<<<<< HEAD
import express from 'express'
import { getDashboard } from '../controllers/Dashboard.js'
import { createDosen, deleteDosen, getCreateDosen, getDosen, getDosenById, getEditDosen, updateDosen } from '../controllers/DosenController.js'
import { createHari, getHari } from '../controllers/HariController.js'
import { getJadwal, getJadwalReport, processPenjadwalan } from '../controllers/JadwalController.js'
import { createMatkul, deleteMatkul, getCreateMatkul, getEditMatkul, getMatkul, getMatkulById, getMatkulByProdi, updateMatkul } from '../controllers/MatkulController.js'
import { createPengampu, deletePengampu, getCreatePengampu, getPengampu, getPengampuById, getUpdatePengampu, updatePengampu } from '../controllers/PengampuController.js'
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

router.get('/dosen', verifyUser, getDosen)
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

router.get('/matkul', verifyUser, getMatkul)
router.get('/matkul/:prodi', verifyUser, getMatkulByProdi)
router.get('/matkul/:prodi/:semester', verifyUser, getMatkul)
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
router.get('/pengampu', verifyUser, getPengampu)
router.get('/pengampu/:tahun_akademik', verifyUser, getPengampu)
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
=======
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
>>>>>>> 005fad5ea06d417488d6c82a79e6d31664eecc00

module.exports = router