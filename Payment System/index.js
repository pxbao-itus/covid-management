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

// config for handlebars
require('./configs/handlebars.config')(app);

app.use('/payment', (req, res) => {
    return res.render('home');
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})