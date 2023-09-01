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


export default router