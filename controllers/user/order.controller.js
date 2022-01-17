const orderRouter = require('express').Router();
const orderModel = require('../../models/user/order.model');
const {formatCurrency, formatDOB, formatTime} = require('../../helpers/helper');

orderRouter.post('/buy', async (req, res) => {
    try {
        let {package, details} = req.body;
        const entityPackage = {
            NguoiLienQuan: req.user.userId,
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
    const userid = req.user.userId;
    try {
        let result = await orderModel.list(userid);
        result = result.sort((item1, item2) => {
            return item2.MaLichSuMua - item1.MaLichSuMua;
        })
        for (let item of result) {
            item.ThoiGian = formatTime(item.ThoiGian);

            item.SoTien = formatCurrency(item.SoTien);
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
        const userid = req.user.userId;
        const historyId = req.query.id;
        const result = await orderModel.detail(userid, historyId);
        for(let index = 0; index < result.details.length; index++) {
            result.details[index].SoLuong = parseInt(result.details[index].SoLuong);
        }
        result.order.SoTien = formatCurrency(result.order.SoTien);
        for (let item of result.details) {
            item.DonGia = formatCurrency(item.DonGia)
        }
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