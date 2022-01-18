// import system module
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require("jsonwebtoken");

// import module

const { resolveSoa } = require("dns");

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
require("./configs/session.config")(app);
// config for passport local
require("./configs/passport-local.config")(app);
// config for handlebars
require("./configs/handlebars.config")(app);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/signin", require("./controllers/signin"));

app.use("/payment", require("./controllers/payment"));

app.get("/", (req, res) => {
  return res.redirect("./signin");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})