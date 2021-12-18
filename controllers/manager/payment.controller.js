const payment = require('express').Router();
const paymentModel = require('../../models/manager/payment.model');


payment.get('/', (req, res) => {
    res.send("Payment");
});

payment.get('/change-limit', (req, res) => {
    res.send("Man Hinh Thay Doi Dinh Muc");
});

payment.post('/change-limit', async (req, res) => {
    // const limitUpdated = req.body.limit;
    try {
        const entity = {
            HanMuc: limitUpdated.hanmuc
        };
        const result = await paymentModel.update(entity);
        res.send(result);
        // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    } catch (error) {
        // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
        res.send(error);

    }
});

payment.post('/accept-payment', async (req, res) => {
    const statusUpdated = req.body.limit;
    // const arrayId = [5];
    try {
        const result = await paymentModel.accept(arrayId);
        res.send(result);
        // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    } catch (error) {
        // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
        res.send(error);

    }
});

module.exports = payment;