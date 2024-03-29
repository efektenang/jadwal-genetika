// import User from "../models/UserModel.js";
const Users = require('../models/UserModel.js')

const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login')
        return res.status(401)
    }

    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.userId = user.id;
    req.role = user.role;

    next();
}

const adminOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if (user.role !== "admin") {
        req.flash('errMsg', 'Halaman ini hanya bisa diakses oleh Admin!')
        res.redirect('/error')
        return res.status(403);
    }    
    
    next();
}

const staffOnly = async (req, res, next) => {
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if (user.role !== "user") {
        req.flash('errMsg', 'Halaman ini hanya bisa diakses oleh Staff!')
        res.redirect('/error')
        return res.status(403);
    }    
    
    next();
}

module.exports = { verifyUser, adminOnly, staffOnly }