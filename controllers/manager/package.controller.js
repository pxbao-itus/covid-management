const packageRouter = require('express').Router();

const packageModel = require('../../models/manager/package.model');

packageRouter.get('/list',async (req, res) => {
    const result = await packageModel.list();
    return res.render('manager/packages', {
        packages: result
    });
})

packageRouter.get('/list/ajax', async (req, res) => {
    try {
        const result = await packageModel.list();
        if(result) {
            return res.send(result);
        } else {
            return res.send([]);
        }
    } catch (error) {
        return res.send([]);
    }
})
packageRouter.get('/delete', async (req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.delete(MaGoiNYP);
        return res.redirect('/manager/package/list');
    } catch (error) {
        return res.redirect('/manager/package/list');
    }
})
packageRouter.get('/detail', async (req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.detail(MaGoiNYP);
        if(result) {
            return res.render('manager/packageDetail', {
                package: result.package,
                details = result.details
            })
        }
        return res.render('/manager/packageDetail');
    } catch (error) {
        return res.render('/manager/packageDetail');
    }
})
packageRouter.post('/update', async (req, res) => {
    const {package, details} = req.body;
    try {
        const entity = {
            TenGoiNYP: package.TenGoiNYP,
            NgayLapGoi: package.NgayLapGoi,
            MucGioiHan: package.MucGioiHan,
            ThoiGianGioiHan: package.ThoiGianGioiHan
        }
        const result = packageModel.update(entity, details, package.MaGoiNYP);
        return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
    } catch (error) {
        return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
    }
})
packageRouter.get('/create', (req, res) => {
    return res.render('manager/packageCreate');
})
packageRouter.post('/create', async (req, res) => {
    const {package, details} = req.body;
    try {
        const result = await packageModel.create(package, details);
        return res.redirect('/manager/package/create');
    } catch (error) {
        return res.redirect('/manager/package/create');
    }
})
module.exports = packageRouter;