import express from 'express'
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    changePassword
 } from "../controllers/Users.js";

import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
import { runRegisterValidation, loginValidation, registerValidation } from '../validations/AuthValidation.js';

const router = express.Router()

router.get('/usersmenu', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/user/changepassword', verifyUser, adminOnly, changePassword)
router.post('/userprocess', registerValidation, runRegisterValidation, createUser);
router.post('/user/update', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router
