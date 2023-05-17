import express from 'express'
import {
    getLogin, 
    getRegister, 
    Login,
    Logout,
    Me
 } from "../controllers/Auth.js";

const router = express.Router()

router.get('/profile', Me);
router.get('/login', getLogin);
// router.get('/register', getRegister)
router.post('/auth/login', Login);
router.post('/auth/logout', Logout)


export default router