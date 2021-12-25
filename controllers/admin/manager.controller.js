const managerRouter = require('express').Router();
const managerModel = require('../../models/admin/manager.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

managerRouter.get('/list', async(req, res) => {
    let result;
    try {
        result = await managerModel.list();
    } catch (error) {
        result = [];
    }
    return res.render('admin/managerList', {
        managers: result
    })
})

managerRouter.get('/create', (req, res) => {
    return res.render('admin/managerCreate');
})


managerRouter.post('/create', async(req, res) => {

    try {
        const Password = await bcrypt.hash(req.body.password, saltRounds);
        const entity = {
            Username: req.body.username,
            Password: Password,
            TrangThai: 1
        }
        const result = await managerModel.create(entity);
    } catch (error) {

    }
    return res.redirect('/admin/manager/create');
})

managerRouter.get('/disable', async(req, res) => {
    try {
        const entity = {
            TrangThai: req.query.status
        }
        const result = managerModel.update(entity, req.query.id);
    } catch (error) {

    }
    return res.redirect('/admin/manager/list');
})
managerRouter.get('/delete?', async(req, res) => {
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
    return res.render('admin/managerHistory');
})
module.exports = managerRouter;