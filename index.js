// import system module
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// import module
const authMiddleware = require('./middlewares/middleware');

// init variable
const app = express();
const port = process.env.PORT

// config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.SECRET_KEY));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// config for session
require('./config/session.config')(app);
// config for passport local
require('./config/passport-local.config')(app);
// config for handlebars
require('./config/handlebars.config')(app);

// use middleware
//app.use(authMiddleware);;
// use router
app.get("/manager", (req, res) => {
    res.render("manager/user/detail.hbs", {
        path: '/manager/user/detail',
    });
})

// router for User, Manager, Admin sign in, sign out, change password
app.use('/auth', require('./controllers/auth.controller'));


app.use('/change-password', require('./controllers/account.controller'));

// router for initial admin account when system start at the first time
app.use('/init', require('./controllers/initAdmin.controller'));


// ------------------ Router for manager -------------------
//router for user
app.use('/manager/user', require('./controllers/manager/user.controller'));

// router for product
app.use('/manager/product', require('./controllers/manager/product.controller'));

// router for package
app.use('/manager/package', require('./controllers/manager/package.controller'));

// router for statistic
app.use('/manager/statistic', require('./controllers/manager/statistic.controller'));

// router for payment
app.use('/manager/payment', require('./controllers/manager/payment.controller'));

//------------------- Router for admin
// router for create manager account
app.use('/admin/manager', require('./controllers/admin/manager.controller'));

// router for manage treatment place
app.use('/admin/treatment-place', require('./controllers/admin/treatment.controller'));

// ------------------ Router for user
// router for package
app.use('/package', require('./controllers/user/package.controller'));

// router for order
app.use('/order', require('./controllers/user/order.controller'))

// router for file upload
// var multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/images/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname)
//     }
// })
// var upload = multer({ storage: storage })
// app.post('/upload', , function(req, res) {
//     console.log(req.file);
//     res.send("upload file thành công")
// });
//router for user
app.use('/user', require('./controllers/user/user.controller'));



// ------------------- Router for api
app.use('/api', require('./controllers/api.controller'));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})