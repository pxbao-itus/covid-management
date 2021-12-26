// import system module
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// import module


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

// use router
app.get("/", (req, res) => {
    res.render("admin/managerCreate.hbs", {
        path: req.originalUrl.split("?").shift(),
    });
})

// use router
// app.get("/auth/signin", (req, res) => {
//     res.render("signin", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/init", (req, res) => {
//     res.render("init", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/user/list", (req, res) => {
//     res.render("manager/user/list", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/user/detail", (req, res) => {
//     res.render("manager/user/detail", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/user/update", (req, res) => {
//     res.render("home", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/user/create", (req, res) => {
//     res.render("home", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/product/list", (req, res) => {
//     res.render("./manager/product/list", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/product/detail", (req, res) => {
//     res.render("manager/product/detail", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/package/list", (req, res) => {
//     res.render("manager/package/list", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/package/detail", (req, res) => {
//     res.render("manager/package/detail", {
//         path: req.originalUrl.split("?").shift(),
//       });
// })
// app.get("/manager/product/delete?id=10", (req, res) => {
//     res.render("home");
// })


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


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})