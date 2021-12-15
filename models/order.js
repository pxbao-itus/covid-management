const pg = require('pg-promise/typescript/pg-subset');

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
const LichSuMuaGoiNYP = 'LichSuMuaGoiNYP';
const ChiTietMuaGoiNYP = 'ChiTietMuaGoiNYP';

exports.createOrder = async (order, orderDetail) => {
    const orderTable = new pgp.helpers.TableName({table: LichSuMuaGoiNYP, schema: schema});
    const detail = new pgp.helpers.TableName({table: ChiTietMuaGoiNYP, schema: schema});
    const qStr = pgp.helpers.insert(order, null, orderTable) + "RETURNING *";
    
    try {
        const resultOrder = await pg.one(qStr);
        const getOrder = pgp.as.format(`SELECT * FROM $1 WHERE "MaLichSuMua" = '${resultOrder.MaLichSuMua}' LIMIT 1`, orderTable);
        const resultGetOrder = await pg.any(getOrder);
        for (const item of orderDetail) {
            const entity = {
                LichSuMua: resultGetOrder.MaLichSuMua,
                NhuYeuPham: item.MaNYP,
                SoLuong: item.SoLuong,
                DonGia: item.DonGia
            }
            const qStrDetail = pgp.helpers.insert(entity, null, detail) + "RETURNING *";
            const resultDetail = await pg.one(qStrDetail);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.listOrder = async (userid) => {
    const orderTable = new pgp.helpers.TableName({table: LichSuMuaGoiNYP, schema: schema});
    const qOrder = pgp.as.format(`SELECT * FROM $1 WHERE "NguoiLienQuan" = $2`, [orderTable, userid]);
    try {
        const resultOrder = pgp.any(qOrder);
        return resultOrder;
    } catch (error) {
        return [];
    }
} 
exports.orderDetail = async (userid, historyid) => {
    const orderTable = new pgp.helpers.TableName({table: LichSuMuaGoiNYP, schema: schema});
    const detail = new pgp.helpers.TableName({table: ChiTietMuaGoiNYP, schema: schema});
    const product = new pgp.helpers.TableName({table: NYP, schema: schema});
    const qOrder = pgp.as.format(`SELECT * FROM $1 WHERE "NguoiLienQuan" = $2 AND "MaLichSuMua" = $3 LIMIT 1`, [orderTable, userid, historyid]);
    try {
        const resultOrder = pgp.one(qOrder);
        const qDetail = pgp.as.format(`SELECT * FROM $1, $2 WHERE $3."NhuYeuPham" = $4."MaNYP" AND $5."LichSuMua" = $6`, [detail, product, detail, product, detail, resultOrder.MaLichSuMua]);
        const resultDetail = pgp.any(qDetail);
        return {
            order: resultOrder,
            details: resultDetail
        }
    } catch (error) {
        return {
            order: {},
            details: []
        };
    }
}