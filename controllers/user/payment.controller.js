const paymentRouter = require('express').Router();
const paymentModel = require('../../models/manager/payment.model');
const bcrypt = require('bcrypt');

paymentRouter.get('/sigin', async (req, res) => {
    if (req.cookies.paymentSignin !== 'on') {
        try {
            res.render('paymentSignin.hbs');
        } catch (error) {
            console.log(error);
        }
    }
    else {
        res.redirect('/payment');
    }
});

paymentRouter.post('/signin', async (req, res) => {
    const account = req.body;
    let result = await paymentModel.get(req.signedCookies['user']);
    const challengeResult = await bcrypt.compare(account.password, result.Password);

    if (challengeResult) {
        res.cookie('paymentSignin', 'on', { expires: new Date(Date.now() + 900000) });
        res.cookie('paymentAccountId', result.MaTaiKhoan, { signed: true, expires: new Date(Date.now() + 900000) });
        return res.send("Dang nhap thanh cong");
    }
    else {
        return res.redirect('/payment/sign')
    }
});

paymentRouter.get('/', (req, res) => {

    if (req.cookies.paymentSignin !== 'on') {
        try {
            res.redirect('payment/sigin');
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.render('payment');
    }
});

paymentRouter.post('/', async (req, res) => {
    if (req.cookies.paymentSignin !== 'on') {
        return res.redirect('/payment/signin');
    }
    else {
        const paymentInserted = req.body;
        const userId = req.signedCookies['userId'];
        const username = req.signedCookies['user'];
        var today = new Date();
        const entity = {
            NguoiLienQuan: userId,
            ThoiGian: today,
            SoTien: paymentInserted.SoTien
        }
        try {
            const result = await paymentModel.create(entity, username);
            if (result) {

                return res.status(200).json({ status: true });
            }
            else {
                return res.status(200).json({ status: false });
            }
        } catch (error) {
            console.log(error);
        }
    }
});

paymentRouter.get('/input-money', async (req, res) => {
    if (req.cookies.paymentSignin !== 'on') {
        return res.redirect('/payment/signin')
    }
});

paymentRouter.post('/input-money', async (req, res) => {
    if (req.cookies.paymentSignin !== 'on') {
        return res.redirect('/payment/signin')
    }
    else {
        const paymentInserted = req.body;
        const accountId = req.signedCookies['paymentAccountId'];
        const entity = {
            SoDu: paymentInserted.SoTien
        }
        try {
            const result = await paymentModel.recharge(entity, accountId);
            if (result) {

                return res.status(200).json({ status: true });
            }
            else {
                return res.status(200).json({ status: false });
            }
        } catch (error) {
            console.log(error);
        }
    }
});



module.exports = paymentRouter;