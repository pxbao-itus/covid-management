const treatmentRouter = require('express').Router();

const treatmentModel = require('../../models/admin/treatment.model');

treatmentRouter.get('/list', async (req, res) => {
    const result = await treatmentModel.list();
    return res.render('admin/treatment/list', {
        treatments: result
    })
})

treatmentRouter.get('/detail', async (req, res) => {
    try {
        const result = await treatmentModel.get(req.query.id);
        if(result) {
            return res.render('admin/treatment/detail', {
                treatment: result
            })
        }
        return res.render('admin/treatment/detail', {
            treatment: []
        })
    } catch (error) {
        return res.render('admin/treatment/detail', {
            treatment: []
        })
    }
})

treatmentRouter.post('/update', async (req, res) => {
    console.log(req.body);
    try {
        const entity = {
            TenNoiDTCL: req.body.TenNoiDTCL,
            SucChua: req.body.SucChua,
            SoLuongHienTai: req.body.SoLuongHienTai,
            DiaChi: req.body.DiaChi,
            Loai: req.body.Loai
        }
        const result = await treatmentModel.update(req.body.MaNoiDTCL, entity);
        return res.redirect(`/detail?id=${req.body.MaNoiDTCL}`);
    } catch (error) {
        return res.redirect(`/detail?id=${req.body.MaNoiDTCL}`);
    }
})

treatmentRouter.post('/create', async (req, res) => {
    try {
        const entity = {
            TenNoiDTCL: req.body.TenNoiDTCL,
            SucChua: req.body.SucChua,
            SoLuongHienTai: req.body.SoLuongHienTai,
            DiaChi: req.body.DiaChi,
            Loai: req.body.Loai
        }
        const result = await treatmentModel.add(entity);
        return res.redirect(`/list`);
    } catch (error) {
        return res.redirect(`/list`);
    }
})
module.exports = treatmentRouter;