const exhbs = require('express-handlebars');
const exhbs_sections = require('express-handlebars-sections');
const path = require('path');


module.exports = app => {

    
    const hbs = exhbs.create({
        defaultLayout: 'main',
        extname: 'hbs',
        helpers: {
    
        }
    });
    exhbs_sections(hbs);
    app.set('view engine', '.hbs');
    app.engine('.hbs', hbs.engine);
}