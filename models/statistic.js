require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})

const schema = 'public';

const NLQ = 'NguoiLienQuan'
const SoNguoiTTT = 'SoNguoiTungTrangThai';
const LichSuDuocQuanLy = 'LichSuDuocQuanLy';
const LichSuMuaGoiNYP = 'LichSuMuaGoiNYP';
const GoiNYP = 'GoiNhuYeuPham';
const ChiTietMuaGoiNYP = 'ChiTietMuaGoiNYP'
const NYP = 'NhuYeuPham'
const LSThanhToan = 'LichSuThanhToan';

exports.loadStatusUsers = async () => {
    const table = new pgp.helpers.TableName({ table: SoNguoiTTT, schema: schema });
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.loadChangeStatus = async () => {
    const table = new pgp.helpers.TableName({ table: LichSuDuocQuanLy, schema: schema });
    const qStr = pgp.as.format('SELECT * FROM $1 WHERE "TrangThaiSau" IS NOT NULL and "TrangThaiTruoc" != "TrangThaiSau"', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.loadConsumPackage = async () => {
    const table_LichSuMuaGoi = new pgp.helpers.TableName({ table: LichSuMuaGoiNYP, schema: schema });
    const table_GoiNYP = new pgp.helpers.TableName({ table: GoiNYP, schema: schema });
    const qStr = pgp.as.format(
        `SELECT "MaGoiNYP","TenGoiNYP", COUNT("MaGoiNYP") AS "SoLuong"
        FROM $1 "LSMG" INNER JOIN $2 "GNYP" ON "LSMG"."GoiNYP" = "GNYP"."MaGoiNYP" 
        GROUP BY "MaGoiNYP", "TenGoiNYP"
         `, [table_LichSuMuaGoi, table_GoiNYP]);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.loadListProduct = async () => {
    const table_ChiTietMuaGoiNYP = new pgp.helpers.TableName({ table: ChiTietMuaGoiNYP, schema: schema });
    const table_NYP = new pgp.helpers.TableName({ table: NYP, schema: schema });
    const qStr = pgp.as.format(
        `SELECT "MaNYP","TenNYP",COUNT("MaNYP") AS "SoLuong", SUM("SoLuong") AS "Tong"
        FROM $1 "CTMGNYP" INNER JOIN $2 "NYP" ON "CTMGNYP"."NhuYeuPham" = "NYP"."MaNYP"
		GROUP BY "MaNYP"`, [table_ChiTietMuaGoiNYP, table_NYP]);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.loadPayment = async () => {
    const table_LSTT = new pgp.helpers.TableName({ table: LSThanhToan, schema: schema });
    const qStr = pgp.as.format(
        `SELECT CAST("ThoiGian" AS DATE),SUM("SoTien") AS "ThanhToan", SUM("SoDuNo") AS "DuNo"
            FROM $1
            GROUP BY CAST("ThoiGian" AS DATE) `, [table_LSTT]);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
