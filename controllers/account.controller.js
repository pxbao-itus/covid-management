const accountRouter = require('express').Router();
const accountModel = require('../models/account.model');
const bcrypt = require('bcrypt');

const userTable = 'TaiKhoanNguoiDung';
const managerTable = 'TaiKhoanNguoiQuanLy';
const adminTable = 'TaiKhoanNguoiQuanTri';


accountRouter.get('/', (req, res) => {
    if(req.cookies.change-password) {
        res.cookie('change-password', 'load');
    }
    return res.render('changePassword');
})

accountRouter.post('/', async (req, res) => {
    const username = req.signedCookies('user');
    try {
        const result = await accountModel.get(userTable, username);
        if(result) {
            const challengeResult = bcrypt.compare(req.body.newpassword, result.Username);
            if(challengeResult) {
                res.cookie('change-password', 'success');
                return res.redirect('/change-password');
            } else {
                res.cookie('change-password', 'incorrect old password');
                return res.redirect('/change-password');
            }
        }
        result = await accountModel.get(managerTable, username);
        if(result) {
            const challengeResult = bcrypt.compare(req.body.newpassword, result.Username);
            if(challengeResult) {
                res.cookie('change-password', 'success');
                return res.redirect('/change-password');
            } else {
                res.cookie('change-password', 'incorrect old password');
            }
        }
        esult = await accountModel.get(adminTable, username);
        if(result) {
            const challengeResult = bcrypt.compare(req.body.newpassword, result.Username);
            if(challengeResult) {
                res.cookie('change-password', 'success');
                return res.redirect('/change-password');
            } else {
                res.cookie('change-password', 'incorrect old password');
            }
        }
    } catch (error) {
        res.cookie('change-password', 'faild');
        res.redirect('/change-password');
    }
})

module.exports = accountRouter;