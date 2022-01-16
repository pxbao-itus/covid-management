const authUser = require('express').Router();
const accountModel = require('../models/account.model')
const passport = require('passport');

const adminAccountTable = 'TaiKhoanNguoiQuanTri';

authUser.get('/signin',async (req, res) =>{
    const adminExist = await accountModel.all(adminAccountTable);
    if(!adminExist) {
        return res.redirect('/init');
    }
    if(req.signedCookies.keep) {
        if(req.signedCookies.keep === 'true') {
            if(req.user) {
                switch(req.user.role) {
                    case 'USER':  return res.redirect('/profile');
                    case 'MANAGER': return res.redirect('/manager');
                    case 'ADMIN': return res.redirect('/admin');
                    default: return res.redirect('/auth/signout');
                }
            }         
        } else {
            return res.redirect('/auth/signout');
        }
    }
    
    if(req.user) {
        switch(req.user.role) {
            case 'USER':  return res.redirect('/profile');
            case 'MANAGER': return res.redirect('/manager');
            case 'ADMIN': return res.redirect('/admin');
            default: return res.redirect('/auth/signout');
        }
    }
    return res.render('signin',{
        title: 'Covid Management',
        path: '/signin'
    });
})

authUser.post('/signin',async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                return res.render('signin', {
                    msg: 'Tên đăng nhập hoặc mật khẩu không chính xác!',
                    title: 'Covid Management',
                    path: '/signin'
                });
            }
            if(!user) {
                return res.render('signin', {
                    msg: 'Tên đăng nhập hoặc mật khẩu không chính xác!',
                    title: 'Covid Management',
                    path: '/signin'
                });
                
            }
            req.logIn(user,async (err) => {
                if(err) {
                    return res.render('signin', {
                        msg: 'Tên đăng nhập hoặc mật khẩu không chính xác!',
                        title: 'Covid Management',
                        path: '/signin'
                    });
                }
                if(req.body.keep === 'on') {
                    res.cookie('keep', 'true', {signed: true});
                } else {
                    res.cookie('keep', 'false', {signed: true});
                }
                let role = 'ADMIN';
                if(req.user.NguoiLienQuan) {
                    role = 'USER';
                }
                if(req.user.MaTaiKhoan) {
                    role = 'MANAGER';
                }
                switch(role) {
                    case 'USER': {              
                        if(req.user.TrangThai === 0) {
                            return res.redirect('/change-password');
                        }
                        return res.redirect("/profile");  ;
                    }
                    case 'MANAGER': {
                        if(req.user.TrangThai === 0) {
                            res.clearCookie('user');
                            return res.render('signin', {
                                msg: 'Tài khoản đã bị khóa!',
                                title: 'Covid Management',
                                path: '/signin'
                            })
                        }
                        return res.redirect("/manager");  
                    }
                    case 'ADMIN': {
                        return res.redirect("/admin"); 
                    }
                    default: {
                        if(req.user.TrangThai === 0) {
                            return res.redirect('/change-password');
                        }
                        return res.redirect("/profile"); 
                    }
                }
      
            })
        })(req, res, next);
    } catch (error) {
        console.log(error);
        return res.redirect('/auth/signin')
    }
    
})


authUser.get('/signout', (req, res) => {
    if(req.signedCookies.keep) {
        res.clearCookie('keep');
    }
    if(req.user) {
        req.logOut();
        return res.redirect('/auth/signin');
    } 
    return res.redirect('/auth/signin');
    
})


module.exports = authUser;;