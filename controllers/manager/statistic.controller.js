const statistic = require('express').Router();

const statisticModel = require('../../models/manager/statistic.model');

statistic.get('/', (req, res) => {
    res.send("statistic");
});

statistic.get('/status-user', async (req, res) => {
    const statusUsers = await statisticModel.listUserStatus();
    console.log(statusUsers);
    res.send(statusUsers);
});

statistic.get('/change-status', async (req, res) => {
    const changeUsers = await statisticModel.listChangeStatus();
    console.log(changeUsers);
    res.send(changeUsers);
});

statistic.get('/consum-package', async (req, res) => {
    const consumPackage = await statisticModel.listConsumPackage();
    console.log(consumPackage);
    res.send(consumPackage);
});

statistic.get('/product', async (req, res) => {
    const statisticProduct = await statisticModel.listProduct();
    console.log(statisticProduct);
    res.send(statisticProduct);
});

statistic.get('/loan-payment', async (req, res) => {
    const statisticPayment = await statisticModel.Payment();
    console.log(statisticPayment);
    res.send(statisticPayment);
});
module.exports = statistic;