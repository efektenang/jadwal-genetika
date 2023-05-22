import express from 'express'
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    resetPassword
 } from "../controllers/Users.js";

import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
import { runRegisterValidation, loginValidation, registerValidation } from '../validations/AuthValidation.js';

const router = express.Router()

router.get('/usersmenu', verifyUser, adminOnly, getUsers)
router.post('/user/reset/:uuid', verifyUser, adminOnly, resetPassword)
router.get('/user/:uuid', verifyUser, adminOnly, getUserById);
router.post('/user/changepassword', verifyUser, changePassword)
router.post('/userprocess', registerValidation, runRegisterValidation, createUser);
router.post('/user/update', verifyUser, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router
