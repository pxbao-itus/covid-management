// import system module
require('dotenv').config();
const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

// import module


// init variable
const app = express();
const port = process.env.PORT

// config app
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', '.hbs');

// config handlebars
const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {

    }
});
app.engine('.hbs', hbs.engine);

// use middleware


// use router
app.get("/", (req, res) => {
    res.render("home");
})





app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
