const managerRouter = require('express').Router();
const managerModel = require('../../models/admin/manager.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const upload = require('../../config/multer.config');
const fs = require('fs');
const csv = require('csv-parser');


managerRouter.get('/list', async(req, res) => {
    let result;
    try {
        result = await managerModel.list();
    } catch (error) {
        result = [];
    }
    return res.render('admin/managerList', {
        managers: result,
        layout: 'adminSidebar',
        title: 'QL người quản lý'
    })
})

managerRouter.get('/create', (req, res) => {
    return res.render('admin/managerCreate', {
        layout: 'adminSidebar',
        title: 'Tạo tài khoản người quản lý',
        path: 'create'
    });
})


managerRouter.post('/create',upload.single('file'), async(req, res) => {
    try {
        if(req.file) {
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', async function(data){
                    try {
                        console.log(data);
                        const Password = await bcrypt.hash(data.password, saltRounds);
                        const entity = {
                            Username: data.username,
                            Password: Password,
                            TrangThai: 1
                        }
                        const result = await managerModel.create(entity);
                    }
                    catch(err) {
                        return res.render('admin/managerCreate', {
                            layout: 'adminSidebar',
                            title: 'Tạo tài khoản người quản lý',
                            path: 'create',
                            msg: 'Tạo tài khoản không thành công',
                        })
                    }
                })
                .on('end',function(){                   
                });
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

managerRouter.get('/update', async (req, res) => {
    try {
        const entity = {
            TrangThai: req.query.status
        }
        const result = managerModel.update(entity, req.query.id);
    } catch (error) {

    }
    return res.redirect('/admin/manager/list');
})
managerRouter.get('/delete', async (req, res) => {
    try {
        const result = managerModel.delete(req.query.id);
    } catch (error) {

    }
    return res.redirect('/admin/manager/list');
    
})
managerRouter.get('/history', async(req, res) => {
    let result;
    try {
        result = await managerModel.history(req.query.id);
    } catch (error) {
        result = [];
    }
    return res.render('admin/managerHistory', {
        history: result
    });

})
module.exports = managerRouter;