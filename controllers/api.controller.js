const apiRouter = require('express').Router();

const addressModel = require('../models/api/address.model');
const productModel = require('../models/api/product.model');
const treatmentModel = require('../models/api/treatment.model');
const packageModel = require('../models/manager/package.model');
const userModel=require('../models/manager/user.model');
const orderModel = require('../models/user/order.model');
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

// api get province, district, ward by id

apiRouter.get('/get/province', async (req, res) => {
    try {
        const province = await addressModel.getProvince(req.query.provinceId);
        return res.send(province);
    } catch (error) {
        return res.send(null);
    }
})

apiRouter.get('/get/district', async (req, res) => {
    try {
        const district = await addressModel.getDistrict(req.query.districtId);
        return res.send(district);
    } catch (error) {
        return res.send(null);
    }
})

apiRouter.get('/get/ward', async (req, res) => {
    try {
        const ward = await addressModel.getWard(req.query.wardId);
        return res.send(ward);
    } catch (error) {
        return res.send(null);
    }
})
// api get all treatment available
apiRouter.get('/treatment', async(req, res) => {
    try {
        let result = await treatmentModel.list();
        if (result) {
            result = result.sort((item1, item2) => {
                return item1.MaNoiDTCL - item2.MaNoiDTCL;
            })
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

// api get all user list
apiRouter.get("/user", async (req, res) => {
  try {
    const result = await userModel.list();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json([]);
  }
});

// api get detail of user by id
apiRouter.get("/user/detail", async (req, res) => {
  try {
    const result = await userModel.detail(req.query.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json([]);
  }
});


apiRouter.get('/get-loan', async (req, res) => {
    try {
        const userId = req.user.userId;
        const loan = await orderModel.getLoan(userId);
        if(loan) {
            return res.status(200).send({SoDuNo: loan.SoDuNo});
        } else {
            return res.status(200).send({SoDuNo: 0});
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({SoDuNo: 0});
    }
})
apiRouter.get('/get-level', async (req, res) => {
    try {
        const level = await orderModel.getLevel();
        if(level) {
            return res.status(200).send({HanMuc: level.HanMuc});
        } else {
            return res.status(200).send({HanMuc: 0});
        }
    } catch (error) {
        console.log(error)
        return res.status(200).send({HanMuc: 0});
    }
})

module.exports = apiRouter;