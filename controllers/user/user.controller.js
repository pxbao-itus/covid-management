const userRouter = require('express').Router();
const userModel = require('../../models/manager/user.model');
const paymentModel = require('../../models/manager/payment.model');


userRouter.get('/profile', async (req, res) => {
    // res.render('profile');
    const userId = req.signedCookies['userId'];
    // const profileUser = await userModel.get(userId);
    res.render('user/profile', {
        layout: 'main'
    });
});

userRouter.get('/history-managed', async (req, res) => {
    const userId = req.signedCookies['userId'];
    const historyPayment = await userModel.history(userId);
    res.send(historyPayment);
});


userRouter.get('/history-payment', async (req, res) => {
    const userId = req.signedCookies['userId'];
    const result = await paymentModel.list(userId);
    return res.send(result);
});

userRouter.get('/announce-payment', async (req, res) => {
    const userId = req.signedCookies['userId'];
    const result = await paymentModel.announce(userId);
    if (result) {
        res.send(result);
    }
    else {
        res.send("Khong co thong bao");
    }
});

module.exports = userRouter;