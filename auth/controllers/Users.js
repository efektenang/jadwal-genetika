import User from "../models/UserModel.js";
import argon2 from 'argon2';

export const getUsers = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        });
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.render('users-menu', {
            title: 'Users Menu',
            layout: 'layouts/templates',
            user,
            response
        })
        res.status(200);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confPassword, role} = req.body;

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user) {
        req.flash('msg', 'Tidak Bisa Menggunakan Email yang Sudah Terdaftar')
        res.redirect('/register')
        return res.status(400)
    }

    if (password !== confPassword) {
        req.flash('msg', 'Password Tidak Sesuai!')
        res.redirect('/register')
        return res.status(400)
    }
    const hashPassword = await argon2.hash(password)

    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        req.flash('msg', 'Daftar Berhasil! Silahkan Login')
        res.redirect('/login')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateUser = async (req, res) => {
        const user = await User.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!user) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, email, password, confPassword, role} = req.body;

        let hashPassword;
        if (password === "" || password === null) {
            hashPassword = user.password
        } else {
            hashPassword = await argon2.hash(password);
        }

        if (password !== confPassword) {
            return res.status(400).json({msg: "Password tidak cocok"})
        }

        try {
            await User.update({
                name: name,
                email: email,
                password: hashPassword,
                role: role
            }, {
                where: {
                    id: user.id
                }
            });
            res.status(200).json({msg: "User Updated"});
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "Data tidak ditemukan"});
    
    try {
        await User.destroy({
             where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}