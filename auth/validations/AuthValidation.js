// import { validationResult, check, body } from "express-validator";

const { validationResult, check } = require('express-validator')

const AuthValidation = {}

AuthValidation.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        req.flash('msg', 'Tidak Bisa Menggunakan Email yang Sudah Terdaftar')
        res.render('register', {
            title: 'Register Akun Baru',
            layout: 'layouts/auth',
            message: req.flash('msg'),
            errors: errors.array()[0].msg
        })
        return res.status(404)
    }
    next()
}

AuthValidation.runRegisterValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('register', {
            title: 'Register',
            layout: 'layouts/auth',
            message: errors.array()[0].msg
        })
        return res.status(404)
    }
    next()
}

AuthValidation.loginValidation = [
    check('email', 'Email Tidak boleh kosong').notEmpty(),
    check('password', 'Password tidak boleh kosong').notEmpty()
]

AuthValidation.registerValidation = [
    check('email', 'Email Tidak Valid').isEmail()
]

module.exports = AuthValidation