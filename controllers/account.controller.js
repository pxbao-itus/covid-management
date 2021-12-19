const accountRouter = require('express').Router();
const accountModel = require('../models/account.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userTable = 'TaiKhoanNguoiDung';
const managerTable = 'TaiKhoanNguoiQuanLy';
const adminTable = 'TaiKhoanNguoiQuanTri';


accountRouter.get('/', (req, res) => {
    if(req.cookies.change-password) {
        res.render('changePassword', {
            msg: req.cookies.change-password
        });
    } else {
        res.render('changePassword');
    }
    return 
})

accountRouter.post('/', async (req, res) => {
    const username = req.signedCookies.user;
    try {
        let result = await accountModel.get(userTable, username);
        if(result) {
            const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
            if(challengeResult) {
                res.cookie('change-password', 'success');
                const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
                console.log(newPassword);
                const entity = {
                    Password: newPassword
                }
                const updatePassword = await accountModel.update(userTable, entity, result.Username);
                return res.redirect('/change-password');
            } else {
                res.cookie('change-password', 'incorrect old password');
                return res.redirect('/change-password');

            }
        }
        result = await accountModel.get(managerTable, username);
        if(result) {
            const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
            
            if(challengeResult) {
                res.cookie('change-password', 'success');
                const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
                const entity = {
                    Password: newPassword
                }
                const updatePassword = await accountModel.update(managerTable, entity, result.Username);
                return res.redirect('/change-password');
            } else {
                res.cookie('change-password', 'incorrect old password');
                return res.redirect('/change-password');
            }
        }
        result = await accountModel.get(adminTable, username);
        if(result) {
            const challengeResult = await bcrypt.compare(req.body.oldpassword, result.Password);
            if(challengeResult) {
                res.cookie('change-password', 'success');
                const newPassword = await bcrypt.hash(req.body.newpassword, saltRounds);
                const entity = {
                    Password: newPassword
                }
                const updatePassword = await accountModel.update(adminTable, entity, result.Username);
                return res.redirect('/change-password');
            } else {
                res.cookie('change-password', 'incorrect old password');
                return res.redirect('/change-password');
            }
        }
    } catch (error) {
        res.cookie('change-password', 'faild');
        return res.redirect('/change-password');
    }
})

module.exports = accountRouter;