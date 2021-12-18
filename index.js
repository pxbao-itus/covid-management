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
// config for handlebars
require('./config/handlebars.config')(app);

// use middleware


// use router
app.get("/", (req, res) => {
    res.render("manager/relatedPeople");
})

// router for User, Manager, Admin sign in, sign out, change password
app.use('/auth', require('./controllers/auth.controller'));

app.use('/change-password', require('./controllers/account.controller'));

// router for initial admin account when system start at the first time
app.use('/init', require('./controllers/initAdmin.controller'));

// ------------------ Router for manager -------------------
// router for product
app.use('/manager/product', require('./controllers/manager/product.controller'));

// router for package
app.use('/manager/package', require('./controllers/manager/package.controller'));

// router for statistic

// router for payment


//------------------- Router for admin
// router for create manager account
app.use('/admin/manager', require('./controllers/admin/manager.controller'));

// router for manage treatment place


// ------------------ Router for user
// router for package
app.use('/package', require('./controllers/user/package.controller'));

// router for order
app.use('/order', require('./controllers/user/order.controller'))


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})