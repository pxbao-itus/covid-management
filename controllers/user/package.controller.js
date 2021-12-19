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
packageRouter.get('/detail', async (req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.detail(MaGoiNYP);
        if(result) {
            return res.render('manager/packageDetail', {
                package: result.package,
                details : result.details
            })
        }
        return res.render('/manager/packageDetail');
    } catch (error) {
        return res.render('/manager/packageDetail');
    }
})

module.exports = packageRouter;
