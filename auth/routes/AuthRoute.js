<<<<<<< HEAD
import express from 'express'
import {
    getError,
    getLogin, 
    getRegister, 
    Login,
    Logout,
    Me
 } from "../controllers/Auth.js";
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const router = express.Router()

router.get('/profile', Me);
router.get('/login', getLogin);
router.get('/error', getError);
router.get('/register', verifyUser, adminOnly, getRegister)
router.post('/auth/login', Login);
router.post('/auth/logout', Logout)
=======
// import express from 'express'
// import {
//     getLogin, 
//     getRegister, 
//     Login,
//     Logout,
//     Me
//  } from "../controllers/Auth.js";
// import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

const express = require('express')
const Auth = require('../controllers/Auth.js')

const router = express.Router()

router.get('/profile', Auth.Me);
router.get('/login', Auth.getLogin);
router.get('/register', Auth.getRegister)
router.post('/auth/login', Auth.Login);
router.post('/auth/logout', Auth.Logout)
>>>>>>> 005fad5ea06d417488d6c82a79e6d31664eecc00

module.exports = router