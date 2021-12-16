const orderRouter = require('express').Router();
const orderModel = require('../../models/user/order.model');


orderRouter.post('/buy', async (req, res) => {
    try {
        const result = await orderModel.create(req.body.order, req.body.orderDetail);
        if(result) {
            return res.status(200).json({status: true});
        } else return res.status(200).json({status: false});
    } catch (error) {
        return res.status(400).json({status: false});
    }
})

orderRouter.get('/list', async (req, res) => {
    const userid = req.cookies.userId;
    try {
        const result = await orderModel.list(userid);
        return res.render('user/order', {
            orders: result
        })
    } catch (error) {
        return res.render('user/order', {
            orders: []
        })
    }
})
orderRouter.get('/detail', async (req, res) => {
    const userid = req.cookies.userId;
    const historyId = req.query.id;
    const result = await orderModel.detail(userid, historyId);
    return res.render('user/orderDetail', {
        order: result.order,
        details: result.details
    })
})
module.exports = orderRouter;