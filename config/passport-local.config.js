const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const accountModel = require('../models/account.model');
const userAccountTable = 'TaiKhoanNguoiDung';
const managerAccountTable = 'TaiKhoanNguoiQuanLy';
const adminAccountTable = 'TaiKhoanNguoiQuanTri';

module.exports = app => {
    var tableName;
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
        async (username, password, done) => {
            let account;
            
            try {
                tableName = userAccountTable;
                account = await accountModel.get(userAccountTable, username);
                if(!account) {
                    tableName = managerAccountTable;
                    account = await accountModel.get(managerAccountTable, username);
                    if(!account) {
                        tableName = adminAccountTable;
                        account = await accountModel.get(adminAccountTable, username);
                        if(!account) {
                            return done(null, false, {message: 'Incorrect username.'});
                        }
                    }  
                    }
                const challengeResult = await bcrypt.compare(password, account.Password);
                if(!challengeResult) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, account);
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.serializeUser(async (account, done) => {
        return done(null, account);
    })
    passport.deserializeUser(async (account, done) => {
        try {
            account = await accountModel.get(tableName, account.Username);
            return done(null, account);
        } catch (error) {
            return done(new Error('error'), null);
        }
    })
    app.use(passport.initialize());
    app.use(passport.session());
}