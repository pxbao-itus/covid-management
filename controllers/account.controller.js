const accountRouter = require('express').Router();
const accountModel = require('../models/account.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userTable = 'TaiKhoanNguoiDung';
const managerTable = 'TaiKhoanNguoiQuanLy';
const adminTable = 'TaiKhoanNguoiQuanTri';


accountRouter.get('/', (req, res) => {
    let msg = false;
    let status = true;
    if(req.cookies.changePassword) {
        if(req.cookies.changePassword === 'failed') {
            msg = 'Mật khẩu cũ không chính xác!';
            status = false;
        }    
        if(req.cookies.changePassword === 'not match') {
            msg = 'Xác nhận mật khẩu mới không đúng!'
            status = false;
        }
        if(req.cookies.changePassword === 'success') {
            msg = 'Đổi mật khẩu thành công!'
        }
    } 
    res.clearCookie('changePassword');
    res.render('user/changepassword', {
        layout: 'user',
        title: 'Đổi mật khẩu',
        style: 'changepw',
        script: 'changepw',
        msg: msg,
        status: status
    });
})

accountRouter.post('/', async (req, res) => {
    //const username = req.signedCookies.user;
    const username = req.cookies.username;
    try {
        let result = await accountModel.get(userTable, username);
        if(result) {
            const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
            if(challengeResult) {
                res.cookie('changePassword', 'success');
                const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
                console.log(newPassword);
                const entity = {
                    Password: newPassword
                }
                const updatePassword = await accountModel.update(userTable, entity, result.Username);
                return res.redirect('/change-password');
            } else {
                res.cookie('changePassword', 'failed');
                return res.redirect('/change-password');
            }
        }
        // result = await accountModel.get(managerTable, username);
        // if(result) {
        //     const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
            
        //     if(challengeResult) {
        //         res.cookie(changePassword, 'success');
        //         const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
        //         const entity = {
        //             Password: newPassword
        //         }
        //         const updatePassword = await accountModel.update(managerTable, entity, result.Username);
        //         return res.redirect('/change-password');
        //     } else {
        //         res.cookie(changePassword, 'Mật khẩu cũ không chính xác');
        //         return res.redirect('/change-password');
        //     }
        // }
        // result = await accountModel.get(adminTable, username);
        // if(result) {
        //     const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
        //     if(challengeResult) {
        //         res.cookie(changePassword, 'success');
        //         const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
        //         const entity = {
        //             Password: newPassword
        //         }
        //         const updatePassword = await accountModel.update(adminTable, entity, result.Username);
        //         return res.redirect('/change-password');
        //     } else {
        //         res.cookie(changePassword, 'Mật khẩu cũ không chính xác');
        //         return res.redirect('/change-password');
        //     }
        // }
    } catch (error) {
        res.cookie('changePassword', 'faild');
        return res.redirect('/change-password');
    }
})

module.exports = accountRouter;