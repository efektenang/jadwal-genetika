// import express from 'express'
// import { 
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
//     changePassword,
//     resetPassword
//  } from "../controllers/Users.js";
 

// import { verifyUser, adminOnly } from '../middleware/AuthUser.js';
// import { runRegisterValidation, loginValidation, registerValidation } from '../validations/AuthValidation.js';

const express = require('express')
const Users = require('../controllers/Users.js')
const { verifyUser, adminOnly } = require('../middleware/AuthUser.js')
const AuthValidation = require('../validations/AuthValidation.js')

const router = express.Router()

router.get('/usersmenu', verifyUser, adminOnly, Users.getUsers)
router.post('/user/reset/:uuid', verifyUser, adminOnly, Users.resetPassword)
router.get('/user/:uuid', verifyUser, adminOnly, Users.getUserById);
router.post('/user/changepassword', verifyUser, Users.changePassword)
router.post('/userprocess', AuthValidation.registerValidation, AuthValidation.runRegisterValidation, Users.createUser);
router.post('/user/update', verifyUser, Users.updateUser);
router.delete('/users/:id', verifyUser, adminOnly, Users.deleteUser);

module.exports = router
