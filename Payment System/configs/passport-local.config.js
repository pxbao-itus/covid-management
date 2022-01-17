const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const accountPaymentModel = require('../models/account.model');
const userAccountPaymentTable = 'TaiKhoanNguoiDungHTTT';

module.exports = app => {
    var tableName;
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
        async (username, password, done) => {
            let account;
            try {
                account = await accountPaymentModel.get(username);
                if(!account) {
                    return done(null, false, {message: 'Incorrect username.'});
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
            account = await accountPaymentModel.get(account.Username);
            return done(null, account);
        } catch (error) {
            return done(new Error('error'), null);
        }
    })
    app.use(passport.initialize());
    app.use(passport.session());
}