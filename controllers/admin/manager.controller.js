const managerRouter = require('express').Router();
const managerModel = require('../../models/admin/manager.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const upload = require('../../config/multer.config');
const fs = require('fs');
const csv = require('csv-parser');
const {formatTime} = require('../../helpers/helper')

// done
managerRouter.get('/list', async(req, res) => {
    let result;
    try {
        result = await managerModel.list();
    } catch (error) {
        result = [];
    }
    result = result.sort((item1, item2) => {
        return item1.MaTaiKhoan - item2.MaTaiKhoan;
    })
    return res.render('admin/managerList', {
        managers: result,
        layout: 'adminSidebar',
        title: 'Danh sách người quản lý',
        path: 'manager'
    })
})

// done
managerRouter.get('/create', (req, res) => {
    return res.render('admin/managerCreate', {
        layout: 'adminSidebar',
        title: 'Tạo tài khoản người quản lý',
        path: 'create'
    });
})

// done
managerRouter.post('/create',upload.single('file'), async(req, res) => {
    try {
        if(req.file) {
             const accounts = req.file.buffer.toLocaleString().split(`\r\n`);
             accounts.pop();
             for (const item of accounts) {
                const itemSplit = item.split(',');
                const Password = await bcrypt.hash(itemSplit[1], saltRounds);
                const entity = {
                    Username: itemSplit[0],
                    Password: Password,
                    TrangThai: 1
                }
                const result = await managerModel.create(entity);
             }          
            return res.render('admin/managerCreate', {
                layout: 'adminSidebar',
                title: 'Tạo tài khoản người quản lý',
                path: 'create',
                msg: 'Tạo tài khoản thành công',
                status: 1
            })
        }
        const Password = await bcrypt.hash(req.body.password, saltRounds);
        const entity = {
            Username: req.body.username,
            Password: Password,
            TrangThai: 1
        }
        const result = await managerModel.create(entity);
        if(result) {
            return res.render('admin/managerCreate', {
                layout: 'adminSidebar',
                title: 'Tạo tài khoản người quản lý',
                path: 'create',
                msg: 'Tạo tài khoản thành công',
                status: 1
            })
        } else {
            return res.render('admin/managerCreate', {
                layout: 'adminSidebar',
                title: 'Tạo tài khoản người quản lý',
                path: 'create',
                msg: 'Tạo tài khoản không thành công',
            })
        }
    } catch (error) {
        console.log(error)
        return res.render('admin/managerCreate', {
            layout: 'adminSidebar',
            title: 'Tạo tài khoản người quản lý',
            path: 'create',
            msg: 'Tạo tài khoản không thành công',
        })
    }
})

// done
managerRouter.get('/update', async (req, res) => {
    try {
        const entity = {
            TrangThai: req.query.status
        }
        const result = managerModel.update(entity, req.query.id);
        if(result) {
            return res.send('success');
        } else {
            return res.send('fail');
        }
    } catch (error) {
        return res.send('fail');
    }
})

// pending
managerRouter.get('/delete', async (req, res) => {
    try {
        const result = managerModel.delete(req.query.id);
    } catch (error) {

    }
    return res.redirect('/admin/manager/list');
    
})


managerRouter.get('/history', async(req, res) => {
    let result;
    let manager;
    try {
        result = await managerModel.history(req.query.id);
        manager = await managerModel.get(req.query.id);
    } catch (error) {
        result = [];
    }
    for (const item of result) {
        item.ThoiGian = formatTime(item.ThoiGian);
    }
    return res.render('admin/managerHistory', {
        histories: result,
        manager,
        layout: 'adminSidebar',
        title: 'Lịch sử người quản lý',
        path: 'history'
    });

})
module.exports = managerRouter;