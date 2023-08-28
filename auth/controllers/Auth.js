// import User from ""
// import argon2 from "argon2"

const User = require('../models/UserModel.js')
const argon2 = require('argon2')

const Auth = {}

Auth.getLogin = async (req, res) => {
    try {
        res.render('login', {
            title: 'Login',
            layout: 'layouts/auth',
            msg: req.flash('msg')
        });
        res.status(200);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

Auth.getRegister = async (req, res) => {
    try {
        res.render('register', {
            title: 'Register Account',
            layout: 'layouts/auth',
            message: req.flash('msg')
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

Auth.Login = async (req, res) => {

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        req.flash('msg', 'Login GAGAL!')
        res.redirect('/login')
        return res.status(401)
    } 

    const match = await argon2.verify(user.password, req.body.password)
    if (!match) {
        req.flash('msg', 'Email atau Password Salah!')
        res.redirect('/login')
        return res.status(400)
    }
    req.session.userId = user.uuid;

    res.redirect('/')
    res.status(200)
}

Auth.Me = async (req, res) => {
    try {
        if (!req.session.userId) {
            res.redirect('/login');
            res.status(401)
        }
    
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role', 'updatedAt'],
            where: {
                uuid: req.session.userId
            }
        })
        if (!user) return res.status(404).json({ msg: "User tidak ditemukan" })

        const date = new Date(user.updatedAt)
        const myDate = date.toISOString().replace('T', ' ')
        const myDateString = myDate.substring(0, myDate.length - 5)

        res.render('profile', {
            title: 'Profile',
            layout: 'layouts/templates',
            oldEmail: req.body.oldEmail,
            user,
            myDateString,
            msg: req.flash('msg'),
            profilemsg: req.flash('profilemsg'),
            msgsuccess: req.flash('msgsuccess')
        })
        res.status(200);
    } catch (error) {
        console.log(error.message)
    }
}

Auth.Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "tidak dapat logout"})
        res.redirect('/login')
        res.status(200)
    })
}

module.exports = Auth