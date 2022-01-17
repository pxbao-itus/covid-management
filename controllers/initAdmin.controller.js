const init = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const accountModel = require('../models/account.model');
const adminAccountTable = 'TaiKhoanNguoiQuanTri';


init.get('/',(req, res) => {
    return res.render('init', {
        path: '/signin',
        title: 'Khởi tạo tài khoản admin'
    });
})
init.post('/', async (req, res) => {
    
    try {
        const account = req.body;
        const Password = await bcrypt.hash(account.password, saltRounds);
        const admin = {
            Username: account.username,
            Password: Password
        }
        await accountModel.add(adminAccountTable, admin);
        return res.redirect('/auth/signin');
    } catch (error) {
        return res.render('init', {
            msg: "Khởi tạo không thành công!",           
        })
    }
})


module.exports = init;