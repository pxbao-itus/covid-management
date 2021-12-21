const user = require('express').Router();
const userModel = require('../../models/manager/user.model');

user.get('/list', async (req, res) => {
    const users = await userModel.list();
    res.send("List-user");
});

user.get('/list/ajax', async (req, res) => {
    const users = await userModel.list();
    res.send(users);
})

user.get('/detail', async (req, res) => {
    const MaNLQ = req.query.id;
    const detailInfo = await userModel.detail(MaNLQ);
    console.log(detailInfo);
    res.send(detailInfo);
});

user.post('/update', async (req, res) => {
    const userUpdated = req.body;
    // const userUpdated = {
    //     id: 1,
    //     trangthaimoi: 'F3',
    //     noidieutri: 1
    // }
    try {
        const entity = {
            TrangThaiHienTai: userUpdated.trangthaimoi,
            NoiDieuTri: userUpdated.noidieutrimoi
        };
        const result = await userModel.update(entity, userUpdated.id);
        return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    } catch (error) {
        return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    }
});

user.get('/create', async (req, res) => {
    if (req.cookies('createUser')) {
        message = req.cookies('create');
    }
    return res.render('manager/userCreate', {
        msg: message
    });
})

user.post('/create', async (req, res) => {
    res.clearCookie('createUser');
    // const objectSample = {
    //     ten: 'Lê Nguyên Tuấn',
    //     cccd: '070200006308',
    //     sdt: '0336647060',
    //     ngaysinh: '1998-01-01',
    //     diachi: 'abcasdasdasdasd',
    //     trangthaihientai: 'F1',
    //     noidieutri: 1
    // }
    try {
        const entity = {
            HoTen: req.body.ten,
            CCCD: req.body.cccd,
            SDT: req.body.sdt,
            NgaySinh: req.body.ngaysinh,
            DiaChi: req.body.diachi,
            TrangThaiHienTai: req.body.trangthaihientai,
            NoiDieuTri: req.body.noidieutri
        }
        const result = await userModel.create(entity);
        if (result) {
            res.cookie('createUser', 'Thêm người liên quan covid thành công.');
        } else {
            res.cookie('createUser', 'Thêm người liên quan covid không thành công.');
        }
        // return res.redirect('/manager/user/create');
        res.send(result);
    } catch (error) {
        return res.redirect('/manager/user/create');
    }
})

module.exports = user;