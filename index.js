// import system module
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// import module
const authMiddleware = require("./middlewares/middleware");
const auditMiddleware = require("./middlewares/audit.middleware");
// init variable
const app = express();
const port = process.env.PORT;

// config app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.SECRET_KEY));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// config for session
require("./config/session.config")(app);
// config for passport local
require("./config/passport-local.config")(app);
// config for handlebars
require("./config/handlebars.config")(app);

// use middleware

//app.use(authMiddleware);
//app.use(auditMiddleware);
// use router


// router for User, Manager, Admin sign in, sign out, change password
app.use("/auth", require("./controllers/auth.controller"));

app.use("/change-password", require("./controllers/account.controller"));

// router for initial admin account when system start at the first time
app.use("/init", require("./controllers/initAdmin.controller"));

// ------------------ Router for manager -------------------
//router for user
app.use("/manager/user", require("./controllers/manager/user.controller"));

// router for product
app.use(
    "/manager/product",
    require("./controllers/manager/product.controller")
);

// router for package
app.use(
    "/manager/package",
    require("./controllers/manager/package.controller")
);

// router for statistic
app.use(
    "/manager/statistic",
    require("./controllers/manager/statistic.controller")
);

// router for payment
app.use(
    "/manager/payment",
    require("./controllers/manager/payment.controller")
);

//------------------- Router for admin
// router for create manager account
app.use("/admin/manager", require("./controllers/admin/manager.controller"));

// router for manage treatment place
app.use(
    "/admin/treatment",
    require("./controllers/admin/treatment.controller")
);

// ------------------ Router for user
// router for package
app.use("/package", require("./controllers/user/package.controller"));

// router for order
app.use("/order", require("./controllers/user/order.controller"));


//router for user
app.use('/user', require('./controllers/user/user.controller'));



// ------------------- Router for api
app.use('/api', require('./controllers/api.controller'));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})