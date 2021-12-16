
require('dotenv').config();
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';
const cnProduct = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DATABASE,
};
const db = pgp(cnProduct);

// Table
const NYP = 'NhuyeuPham';
const GoiNYP = 'GoiNhuYeuPham';
const ChiTietGoiNYP = 'ChiTietGoiNYP';
const TaiKhoanNguoiQuanLy = 'TaiKhoanNguoiQuanLy';
const LichSuNguoiQuanLy = 'LichSuNguoiQuanLy';


exports.listProduct = async () => {
    const table = new pgp.helpers.TableName({table: NYP, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProduct = async (value) => {
    const table = new pgp.helpers.TableName({table: NYP, schema: schema});
    const detail = new pgp.helpers.TableName({table: ChiTietGoiNYP, schema: schema});
    const qStr = pgp.as.format('DELETE FROM $1 WHERE "MaNYP" = $2', [table, value]);
    const qStr1 = pgp.as.format('DELETE FROM $1 WHERE "MaNYP" = $2', [detail, value]);
    try {
        await db.none(qStr1);
        await db.none(qStr);     
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
exports.detailProduct = async (value) => {
    const table = new pgp.helpers.TableName({table: NYP, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "MaNYP" = '${value}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}
exports.updateProduct = async (entity, value) => {
    const table = new pgp.helpers.TableName({table: NYP, schema: schema});
    const condition = pgp.as.format(' WHERE "MaNYP" = $1', [value]);
    const qStr = pgp.helpers.update(entity, null, table) + condition + " RETURNING *";
    console.log(qStr)
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}
exports.createProduct = async (entity) => {
    const table = new pgp.helpers.TableName({table: NYP, schema: schema});
    const qStr = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}
