
require('dotenv').config();
const pgp = require('pg-promise')()

const cn = {
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DATABASE,
  max: 20,
  // ssl: {
  //     rejectUnauthorized : false,
  // }
};
const db =  pgp(cn);

module.exports = db;
