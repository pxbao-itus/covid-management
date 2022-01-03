const exhbs = require("express-handlebars");
const path = require("path");

module.exports = (app) => {
  const hbs = exhbs.create({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
     
    },
  });
  app.set("view engine", ".hbs");
  app.engine(".hbs", hbs.engine);
};
