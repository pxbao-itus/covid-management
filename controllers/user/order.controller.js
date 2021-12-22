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
    const userid = 2;//req.cookies.userId;
    try {
        const result = await orderModel.list(userid);
        for (let index = 0; index < result.length; index++) {
            result[index].ThoiGian = JSON.stringify(result[index].ThoiGian).slice(1,11);
        }
        return res.render('user/orders', {
            orders: result,
            layout: 'user',
            style: 'orders',
            script: 'orders',
            title: 'Lịch sử mua hàng'
        })
    } catch (error) {
        console.log(error)
        return res.render('user/orders', {
            orders: [],
            layout: 'user',
            style: 'orders',
            script: 'orders',
            title: 'Lịch sử mua hàng'
        })
    }
})
orderRouter.get('/detail', async (req, res) => {
    try {
        const userid = '2'; //req.cookies.userId;
        const historyId = req.query.id;
        const result = await orderModel.detail(userid, historyId);
        for(let index = 0; index < result.details.length; index++) {
            result.details[index].SoLuong = parseInt(result.details[index].SoLuong);
            result.details[index].SoLuongToiDa = parseInt(result.details[index].SoLuongToiDa);
            result.details[index].SoLuongToiThieu = parseInt(result.details[index].SoLuongToiThieu);
        }
        result.order.SoTien = parseInt(result.order.SoTien);
        return res.render('user/orderDetail', {
            order: result.order,
            details: result.details,
            title: 'Chi tiết mua hàng',
            layout: 'user',
            style: 'order.detail',
            script: 'order.detail'
        })
    } catch (error) {
        console.log(error)
    }
    
})
module.exports = orderRouter;