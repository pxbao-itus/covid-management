
require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true,
})
const cn = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DATABASE,
};
const db = pgp(cn);

module.exports = db;