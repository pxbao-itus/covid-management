const packageRouter = require('express').Router();
const packageModel = require('../../models/manager/package.model');


packageRouter.get('/list',async (req, res) => {
    let result = await packageModel.list();
    let resultPagnition = [];
    if(req.query.search) {
        result = result.filter(item => {
            return (item.TenGoiNYP.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0);
        })
    }
    if(req.query.sort) {
        if(req.query.sort === 'th') {
            result = result.sort((item1, item2) => {
                return item1.ThoiGianGioiHan - item2.ThoiGianGioiHan;
            })
        }
        if(req.query.sort === 'hm') {
            result = result.sort((item1, item2) => {
                return item1.ThoiGianGioiHan - item2.ThoiGianGioiHan;
            })
        }
    }
    let pagnition = [];
    for(let index = 1; index <= ((result.length - result.length%6)/6); index++ ) {
        pagnition.push(index);
    }
    if(result.length%6 > 0) {
        pagnition.push(((result.length - result.length%6)/6) + 1);
    }
    if(req.query.page) {
        for(let index = 6*(req.query.page - 1); index < 6*req.query.page; index++){
            if(result[index]) {
                resultPagnition.push(result[index]);
            } else {
                break;
            }
            
        }
    } else {
        for(let index = 0; index < 6; index++) {
            if(result[index]) {
                resultPagnition.push(result[index]);
            } else {
                break;
            }
        }
    }
    
    return res.render('user/packages', {
        packages: resultPagnition,
        layout: 'user',
        style: 'packages',
        title: 'Mua hàng',
        script: 'packages',
        textSearch: req.query.search,
        sort: {
            th: (req.query.sort === 'th'),
            hm: (req.query.sort === 'hm')
        },
        pagnition: pagnition,
        pageActive: req.query.page || 1
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
        for (let index = 0; index < result.details.length; index++) {
            result.details[index].SoLuong = parseInt(result.details[index].SoLuong)
            result.details[index].SoLuongToiDa = parseInt(result.details[index].SoLuongToiDa)
            result.details[index].SoLuongToiThieu = parseInt(result.details[index].SoLuongToiThieu)
        }
        return res.render('user/packageDetail', {
            layout: 'user',
            title: 'Chi tiết gói nhu yếu phẩm',
            style: 'package.detail',
            script: 'package.detail',
            package: result.package,
            details: result.details

        });
    } catch (error) {
        return res.render('/user/package.detail');
    }
})

module.exports = packageRouter;
