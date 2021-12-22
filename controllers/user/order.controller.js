const orderRouter = require('express').Router();
const orderModel = require('../../models/user/order.model');


orderRouter.post('/buy', async (req, res) => {
    try {
        console.log(req.body)
        let {package, details} = req.body;
        const entityPackage = {
            NguoiLienQuan: 2,//req.signedCookies.userId,
            GoiNYP: package.MaGoiNYP,
            SoTien: package.SoTien,
            ThoiGian: package.ThoiGian
        }
        const result = await orderModel.create(entityPackage, details);
        if(result) {
            return res.status(200).json({status: true});
        } else return res.status(200).json({status: false});
    } catch (error) {
        console.log(error)
        return res.status(400).json({status: false});
    }
})

orderRouter.get('/list', async (req, res) => {
    const userid = req.cookies.userId;
    try {
        const result = await orderModel.list(userid);
        return res.render('user/order', {
            orders: result,
            layout: 'user'
        })
    } catch (error) {
        return res.render('user/order', {
            orders: [],
            layout: 'user'
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