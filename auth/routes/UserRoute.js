import express from 'express'
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
 } from "../controllers/Users.js";

import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
import { runRegisterValidation, loginValidation, registerValidation } from '../validations/AuthValidation.js';

const router = express.Router()

router.get('/usersmenu', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUserById);
router.post('/userprocess', registerValidation, runRegisterValidation, createUser);
router.patch('/user/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

export default router
