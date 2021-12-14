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
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
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
    res.render("home");
})

// router for User, Manager, Admin sigin and signout
app.use('/auth', require('./controllers/user/auth.controller'));

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

// router for manage manager

// router for manage treatment place


// ------------------ Router for user

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
