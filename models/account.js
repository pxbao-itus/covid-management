
require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';

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
        return null;
    }
}

exports.getAccount = async (tbName, filedName, value) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "${filedName}" = '${value}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        return null;
    }
}
exports.addAccount = async (tbName, entity) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const qStr = pgp.helpers.insert(entity, null, table) + " RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.updateAccount = async (tbName, entity, value) => {
    const table = new pgp.helpers.TableName({table: tbName, schema: schema});
    const condition = pgp.as.format(' WHERE "Username" = $1', [value]);
    const qStr = pgp.helpers.update(entity, null, table) + condition + " RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {

        return null;
    }
}
