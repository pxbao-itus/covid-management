const statistic = require('express').Router();
const {formatDOB} = require('../../helpers/helper');
const statisticModel = require('../../models/manager/statistic.model');

statistic.get('/', (req, res) => {
    res.render("manager/statistic/statistic", {
        title: 'Thống kê'
    });
});

statistic.get('/status-user', async(req, res) => {
    let statusUsers = await statisticModel.listUserStatus();
    for (let item of statusUsers) {
        item.ThoiGian = formatDOB(item.ThoiGian);
    }
    res.send(statusUsers);
});

statistic.get('/change-status', async(req, res) => {
    const changeUsers = await statisticModel.listChangeStatus();
    res.send(changeUsers);
});

statistic.get('/consum-package', async(req, res) => {
    const consumPackage = await statisticModel.listConsumPackage();
    res.send(consumPackage);
});

statistic.get('/product', async(req, res) => {
    const statisticProduct = await statisticModel.listProduct();
    res.send(statisticProduct);
});

statistic.get('/loan-payment', async(req, res) => {
    let statisticPayment = await statisticModel.Payment();
    for (let item of statisticPayment) {
        item.ThoiGian = formatDOB(item.ThoiGian);
    }
    res.send(statisticPayment);
});
module.exports = statistic;