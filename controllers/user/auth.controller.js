const authUser = require('express').Router();
const userModel = require('../../models/account.model')
const bcrypt = require('bcrypt');
const passport = require('passport');

const saltRounds = 10;
const tableName = 'TaiKhoanNguoiDung';

authUser.get('/signin',async (req, res) =>{
    if(req.signedCookies.user) {
        const user = await userModel.get(tableName, req.signedCookies.user);
        if(user) {
            return res.redirect('/home');
        } else {
            return res.render('user/signin');
        }
    }
    if(req.account) {
        const user = await userModel.get(tableName, req.account.username);
        if(user) {
            return res.redirect('/home');
        } else {
            return res.render('user/signin');
        }
    }
    return res.render('user/signin');
})

authUser.post('/signin',async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            return res.render('user/signin', {
                msg: err
            });
        }
        if(!user) {
            return res.render('user/signin', {
                msg: 'Username or password is incorrect!'
            });
        }
        req.logIn(user,async (err) => {
            if(err) {
                return res.render('user/signin', {
                    msg: err
                });
            }
            if(req.body.keep === 'on') {
                res.cookie('user', user.Username, {signed: true});
            }
            return res.redirect("/home");     
        })
    })(req, res, next);
})


authUser.get('/signout', (req, res) => {
    if(req.signedCookies.user){
        res.clearCookie('user');
    }
    if(req.account) {
        req.logOut();
    }
    return res.redirect('/auth/signin')
})
module.exports = authUser;;