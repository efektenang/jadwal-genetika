import User from "../models/UserModel.js"
import argon2 from "argon2"

export const getLogin = async (req, res) => {
    try {
        res.render('sign-in', {
            title: 'Login',
            layout: 'layouts/auth',
            msg: req.flash('msg')
        });
        res.status(200);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getError = async (req, res) => {
    try {
        res.render('404', {
            title: 'Error',
            layout: 'layouts/auth',
            msg: req.flash('errMsg')
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getRegister = async (req, res) => {
    try {
        res.render('sign-up', {
            title: 'Register Account',
            layout: 'layouts/auth',
            message: req.flash('msg')
        })
        res.status(200)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const Login = async (req, res) => {

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

    const sessionTimeout = 3600000
    setTimeout(() => {
        req.session.destroy()
    }, sessionTimeout)

    req.session.userId = user.uuid

    if (user.role === 'admin') {
        res.redirect('/usersmenu')
        return res.status(200)
    }

    req.flash('loginmsg', 'Login Berhasil! Selamat Datang ')
    res.redirect('/')
    res.status(200)
}

export const Me = async (req, res) => {
    try {
        if (!req.session.userId) {
            res.redirect('/login')
            res.status(401)
        }
    
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role', 'prodi', 'updatedAt'],
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

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "tidak dapat logout"})
        res.redirect('/login')
        res.status(200)
    })
}