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

module.exports = router