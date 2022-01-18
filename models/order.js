
require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';


// Table
const NYP = 'NhuYeuPham';
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
        const resultOrder = await db.one(qStr);
        const getOrder = pgp.as.format(`SELECT * FROM $1 WHERE "MaLichSuMua" = '${resultOrder.MaLichSuMua}' LIMIT 1`, orderTable);
        for (const item of orderDetail) {
            const entity = {
                LichSuMua: resultOrder.MaLichSuMua,
                NhuYeuPham: item.MaNYP,
                SoLuong: item.SoLuong,
                DonGia: item.DonGia
            }
            const qStrDetail = pgp.helpers.insert(entity, null, detail) + "RETURNING *";
            const resultDetail = await db.one(qStrDetail);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.listOrder = async (userid) => {
    const orderTable = new pgp.helpers.TableName({table: LichSuMuaGoiNYP, schema: schema});
    const packageTable = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const qOrder = pgp.as.format(`SELECT * FROM $1, $2 WHERE $6."NguoiLienQuan" = $3 AND $4."GoiNYP" = $5."MaGoiNYP"`, [orderTable, packageTable, userid, orderTable, packageTable, orderTable]);
    try {
        const resultOrder = db.any(qOrder);
        return resultOrder;
    } catch (error) {
        return [];
    }
} 
exports.orderDetail = async (userid, historyid) => {
    const orderTable = new pgp.helpers.TableName({table: LichSuMuaGoiNYP, schema: schema});
    const detail = new pgp.helpers.TableName({table: ChiTietMuaGoiNYP, schema: schema});
    const product = new pgp.helpers.TableName({table: NYP, schema: schema});
    const packageTable = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const qOrder = pgp.as.format(`SELECT * FROM $1, $2 WHERE $6."NguoiLienQuan" = $3 AND $4."GoiNYP" = $5."MaGoiNYP" AND $7."GoiNYP" = $8."MaGoiNYP" AND $9."MaLichSuMua" = $10`, [orderTable, packageTable, userid, orderTable, packageTable, orderTable, orderTable, packageTable, orderTable, historyid]);
    try {
        const resultOrder = await db.any(qOrder);
        const qDetail = pgp.as.format(`SELECT * FROM $1, $2 WHERE $3."NhuYeuPham" = $4."MaNYP" AND $5."LichSuMua" = $6`, [detail, product, detail, product, detail, historyid]);
        const resultDetail = await db.any(qDetail);
        return {
            order: resultOrder[0],
            details: resultDetail
        }
    } catch (error) {
        return {
            order: {},
            details: []
        };
    }
}