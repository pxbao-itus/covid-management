
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


// exports for admin: manage manager
exports.createManagerAccount = async (entity) => {
    const table = new pgp.helpers.TableName({table: TaiKhoanNguoiQuanLy, schema: schema}); 
    const qStr = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.listManagerAccount = async () => {
    const table = new pgp.helpers.TableName({table: TaiKhoanNguoiQuanLy, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.updateManagerAccount = async (entity, value) => {
    const table = new pgp.helpers.TableName({table: TaiKhoanNguoiQuanLy, schema: schema});
    const condition = pgp.as.format(' WHERE "MaTaiKhoan" = $1', [value]);
    const qStr = pgp.helpers.update(entity, null, table) + condition + " RETURNING *";
    console.log(qStr)
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.deleteManagerAccount = async (value) => {
    const manager = new pgp.helpers.TableName({table: TaiKhoanNguoiQuanLy, schema: schema});
    const history = new pgp.helpers.TableName({table: LichSuNguoiQuanLy, schema: schema});
    const queryManager = pgp.as.format('DELETE FROM $1 WHERE "MaTaiKhoan" = $2', [manager, value]);
    const queryHistory = pgp.as.format('DELETE FROM $1 WHERE "NguoiQuanLy" = $2', [history, value]);
    try {
        await pgp.none(queryHistory);
        await pgp.none(queryManager);
        return true;
    } catch (error) {
        return false;
    }
}
exports.historyManagerAction = async (value) => {
    const table = new pgp.helpers.TableName({table: LichSuNguoiQuanLy, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "NguoiQuanLy" = $2`, [table, value]);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
