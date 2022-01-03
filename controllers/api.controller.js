const apiRouter = require('express').Router();

const addressModel = require('../models/api/address.model');
const productModel = require('../models/api/product.model');
const treatmentModel = require('../models/api/treatment.model');
const packageModel = require('../models/manager/package.model');
const userModel=require('../models/manager/user.model');
// api get all province
apiRouter.get('/province', async(req, res) => {
    try {
        const result = await addressModel.province();
        if (result) {
            return res.status(200).json(result);
        } else {
            throw 'can not connect database';
        }
    } catch (error) {
        return res.status(400).json([]);
    }
})

// api get all district with provinceid
apiRouter.get('/district', async(req, res) => {
    try {
        const result = await addressModel.district(req.query.province);
        if (result) {
            return res.status(200).json(result);
        } else {
            throw 'can not connect database';
        }
    } catch (error) {
        return res.status(400).json([]);
    }
})

// api get all ward with districtid
apiRouter.get('/ward', async(req, res) => {
    try {
        const result = await addressModel.ward(req.query.district);
        if (result) {
            return res.status(200).json(result);
        } else {
            throw 'can not connect database';
        }
    } catch (error) {
        return res.status(400).json([]);
    }
})

// api get all treatment available
apiRouter.get('/treatment', async(req, res) => {
    try {
        const result = await treatmentModel.list();
        if (result) {
            return res.status(200).json(result);
        } else {
            throw 'can not connect database';
        }
    } catch (error) {
        return res.status(400).json([]);
    }
})

// api get all product
apiRouter.get('/product', async(req, res) => {
    try {
        const result = await productModel.list();
        if (result) {
            return res.status(200).json(result);
        } else {
            throw 'can not connect database';
        }
    } catch (error) {
        return res.status(400).json([]);
    }
})

// api get all package
apiRouter.get('/package', async(req, res) => {
    try {
        const result = await packageModel.list();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json([]);
    }
})

// api get detail of package by package id 
apiRouter.get('/package/detail', async(req, res) => {
    try {
        const result = await packageModel.detail(req.query.id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json([]);
    }
})

// apis update status, treatment place of user
apiRouter.get('/manager/user/change-status', async(req, res) => {
    try {
        const entity = {
            TrangThaiHienTai: req.query.status
        }
        const result = await userModel.update(entity, req.query.userid);
        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(400).json({msg: "fail"});
    }
})
apiRouter.get('/manager/user/change-treatment', async (req, res) => {
    try {
        const entity = {
            NoiDieuTri: req.query.treatmentid
        }
        const result = await userModel.update(entity, req.query.userid);
        return res.status(200).json({msg: "success"});
    } catch (error) {
        return res.status(400).json({msg: "fail"});
    }
})
module.exports = apiRouter;