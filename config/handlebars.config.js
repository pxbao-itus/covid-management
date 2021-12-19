const exhbs = require('express-handlebars');
const exhbs_sections = require('express-handlebars-sections');
const path = require('path');


module.exports = app => {

    const hbs = exhbs.create({
      defaultLayout: "main",
      extname: "hbs",
      helpers: {
        ifStr(s1, s2, options) {
          return s1 == s2 ? options.fn(this) : options.inverse(this);
        },
      },
    });
    exhbs_sections(hbs);
    app.set('view engine', '.hbs');
    app.engine('.hbs', hbs.engine);
}