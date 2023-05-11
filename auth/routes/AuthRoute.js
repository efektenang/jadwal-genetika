import express from 'express'
import { body, check } from 'express-validator';
import {
    getLogin, 
    getRegister, 
    Login,
    Logout,
    Me
 } from "../controllers/Auth.js";


import { runValidation, loginValidation } from '../validations/AuthValidation.js';
const router = express.Router()

router.get('/me', Me);
router.get('/login', getLogin);
// router.get('/register', getRegister)
router.post('/auth/login', Login);
router.post('/auth/logout', Logout)


export default router