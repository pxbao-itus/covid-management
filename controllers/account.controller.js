const accountRouter = require('express').Router();
const accountModel = require('../models/account.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userTable = 'TaiKhoanNguoiDung';
const managerTable = 'TaiKhoanNguoiQuanLy';
const adminTable = 'TaiKhoanNguoiQuanTri';


accountRouter.get('/', (req, res) => {
    res.render('user/changepassword', {
        layout: 'user',
        title: 'Đổi mật khẩu',
        style: 'changepw',
        script: 'changepw',
    });
})

accountRouter.post('/', async (req, res) => {
    const username = req.user.username;
    try {
        let result = await accountModel.get(userTable, username);
        if(result) {
            const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
            if(challengeResult) {
                const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
                const entity = {
                    Password: newPassword,
                    TrangThai: 1
                }
                const updatePassword = await accountModel.update(userTable, entity, result.Username);
                return res.render('user/changepassword', {
                    layout: 'user',
                    title: 'Đổi mật khẩu',
                    style: 'changepw',
                    script: 'changepw',
                    msg: 'Đổi mật khẩu thành công',
                    status: 1
                });
        } else {
                return res.render('user/changepassword', {
                    layout: 'user',
                    title: 'Đổi mật khẩu',
                    style: 'changepw',
                    script: 'changepw',
                    msg: 'Mật khẩu cũ không chính xác'
                });
            }
        }      
    } catch (error) {
        return res.render('user/changepassword', {
            layout: 'user',
            title: 'Đổi mật khẩu',
            style: 'changepw',
            script: 'changepw',
            msg: 'Đổi mật khẩu không thành công'
        });
    }
})

module.exports = accountRouter;