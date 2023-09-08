import User from "../models/UserModel.js";
import argon2 from 'argon2';

export const getUsers = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role', 'prodi'],
            where: {
                uuid: req.session.userId
            }
        });
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'role', 'prodi']
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
            attributes: ['uuid', 'name', 'email', 'role', 'prodi'],
            where: {
                uuid: req.params.uuid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confPassword, role, prodi} = req.body;

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
            role: role,
            prodi: prodi
        });
        req.flash('msg', 'Daftar Berhasil! Silahkan Login')
        res.redirect('/login')
        res.status(201)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        if (!user) return res.status(404).json({msg: "Data tidak ditemukan"});
        
        const { name, email, profilepassword } = req.body
        const match = await argon2.verify(user.password, profilepassword)
        if (!match) {
            req.flash('profilemsg', 'Password Salah!')
            res.redirect('/profile')
            return res.status(400)
        }
        const users = await User.findOne({
            where: {
                email
            }
        });

        if (email !== req.body.oldEmail && users) {
            req.flash('profilemsg', 'Tidak Bisa Menggunakan Email yang Sudah Terdaftar')
            res.redirect('/profile')
            return res.status(400)
        }

        await User.update({
            name: name,
            email
        }, {
            where: {
                uuid: req.session.userId
            }
        })
        
        req.flash('msgsuccess', 'Data berhasil diubah!')
        res.redirect('/profile')
        res.status(200)
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        })

        if (!user) return res.status(404).json({ msg: "Data tidak ditemukan" })
        
        const newPassword = '123456'
        const hashPassword = await argon2.hash(newPassword)

        await User.update({
            password: hashPassword
        }, {
            where: { uuid: req.params.uuid }
        })

        res.redirect('/usersmenu')
        res.status(201)
    } catch (error) {
        console.log(error.message)
    }
}

export const changePassword = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        })
        if (!user) return res.status(404).json({msg: "Data tidak ditemukan"});
        
        const { oldPassword, password, confPassword } = req.body

        if (password.length < 6) {
            req.flash('msg', 'Password Baru harus berisi 6 karakter atau lebih!')
            res.redirect('/profile')
            return res.status(400)
        }
        
        if (password !== confPassword) {
            req.flash('msg', 'Password Baru Tidak Sesuai!')
            res.redirect('/profile')
            return res.status(400)
        }

        const match = await argon2.verify(user.password, oldPassword)
        if (!match) {
            req.flash('msg', 'Password lama Salah!')
            res.redirect('/profile')
            return res.status(400)
        }

        const hashPassword = await argon2.hash(password)
        await User.update({
            password: hashPassword
        }, {
            where: {uuid: req.session.userId}
        })

        req.session.destroy((err) => {
            if(err) return res.status(400).json({msg: "tidak dapat logout"})
            res.redirect('/login')
            res.status(200)
        })

    } catch (error) {
        console.log(error.message)
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