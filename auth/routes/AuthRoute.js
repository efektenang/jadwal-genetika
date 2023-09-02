const express = require('express')
const Auth = require('../controllers/Auth.js')
const {verifyUser, adminOnly} = require('../middleware/AuthUser.js')

const router = express.Router()

router.get('/profile', Auth.Me);
router.get('/login', Auth.getLogin);
router.get('/error', Auth.getError);
router.get('/register', verifyUser, adminOnly, Auth.getRegister)
router.post('/auth/login', Auth.Login);
router.post('/auth/logout', Auth.Logout)

module.exports = router