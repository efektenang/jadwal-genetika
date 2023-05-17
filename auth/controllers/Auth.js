import User from "../models/UserModel.js"
import argon2 from "argon2"

export const getLogin = async (req, res) => {
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

export const getRegister = async (req, res) => {
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

export const Login = async (req, res) => {

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) {
        req.flash('msg', 'Login GAGAL!')
        res.redirect('/login')
        return res.status(404)
    } 

    const match = await argon2.verify(user.password, req.body.password)
    if (!match) {
        req.flash('msg', 'Email atau Password Salah!')
        res.redirect('/login')
        return res.status(400)
    }
    req.session.userId = user.uuid;
    
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    res.redirect('/')
    res.status(200)
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        // return res.redirect('/login');
        return res.status(401).json({msg: "Mohon login ke akun anda"})
    }

    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.render('profile', {
        title: 'Profile',
        layout: 'layouts/templates',
        user,
        msg: req.flash('msg'),
        profilemsg: req.flash('profilemsg')
    })
    res.status(200);
}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "tidak dapat logout"})
        res.redirect('/login')
        res.status(200)
    })
}