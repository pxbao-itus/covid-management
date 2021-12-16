
require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';
require('dotenv').config();
const cn = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DATABASE,
};
const db = pgp(cn);

// Table
const NYP = 'NhuyeuPham';
const GoiNYP = 'GoiNhuYeuPham';
const ChiTietGoiNYP = 'ChiTietGoiNYP';
const TaiKhoanNguoiQuanLy = 'TaiKhoanNguoiQuanLy';
const LichSuNguoiQuanLy = 'LichSuNguoiQuanLy';

// exports for account
exports.loadAccount = async tbName => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}

exports.getAccount = async (tbName, filedName, value) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "${filedName}" = '${value}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}
exports.addAccount = async (tbName, entity) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}

exports.updateAccount = async (tbName, entity, value) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const condition = pgp.as.format(' WHERE "Username" = $1', [value]);
    const qStr = pgp.helpers.update(entity, null, table) + condition + " RETURNING *";
    console.log(qStr)
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}
