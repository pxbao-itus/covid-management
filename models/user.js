require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';

const NLQ = 'NguoiLienQuan';
const MLH = 'MoiLienHe';
const LichSuDuocQuanLy = 'LichSuDuocQuanLy';
const moiLienHe = 'MoiLienHe';
exports.addRelation = async(entity) => {
    const table = new pgp.helpers.TableName({ table: moiLienHe, schema: schema });
    const qStr1 = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.any(qStr1);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports.loadListUser = async() => {
    const table = new pgp.helpers.TableName({ table: NLQ, schema: schema });
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports.viewDetailUser = async id => {
    var userDetail = {};
    const table_NLQ = new pgp.helpers.TableName({ table: NLQ, schema: schema });
    const table_MLH = new pgp.helpers.TableName({ table: MLH, schema: schema });
    const table_LichSuDuocQuanLy = new pgp.helpers.TableName({ table: LichSuDuocQuanLy, schema: schema });
    const qrs_NguoiLienQuan = pgp.as.format(`SELECT * FROM $1 WHERE "MaNguoiLienQuan" = ${id}`, table_NLQ);
    //     const qrs_NguoiLienDoi = pgp.as.format(`
    //     SELECT "NguoiLienQuan2" "MaNguoiLienQuan" ,NLQ."HoTen",NLQ."CCCD",NLQ
    //    ."SoDienThoai",NLQ."NgaySinh",NLQ."DiaChi",NLQ."TrangThaiHienTai",NLQ."NoiDieuTri" 
    //    FROM $1 MLH INNER JOIN $2 NLQ 
    //    ON NLQ."MaNguoiLienQuan" = MLH."NguoiLienQuan2" WHERE MLH."NguoiLienQuan1" =  ${id} ;
    const qrs_NguoiLienDoi = pgp.as.format(`
    SELECT "NguoiLienQuan2" "MaNguoiLienQuan" ,NLQ."HoTen",NLQ."CCCD",NLQ
   ."SoDienThoai",NLQ."NgaySinh",NLQ."DiaChi",NLQ."TrangThaiHienTai",NLQ."NoiDieuTri" 
   FROM $1 MLH , $2 NLQ 
    WHERE (MLH."NguoiLienQuan1" =  ${id} and NLQ."MaNguoiLienQuan" = MLH."NguoiLienQuan2")
    or (MLH."NguoiLienQuan2" =  ${id} and NLQ."MaNguoiLienQuan" = MLH."NguoiLienQuan1") ;
   
    `, [table_MLH, table_NLQ]);
    const qrs_LichSuDuocQuanLy = pgp.as.format(`SELECT * FROM $1 WHERE "NguoiLienQuan" = ${id}`, table_LichSuDuocQuanLy);
    try {
        const ChiTietNguoiLienQuan = await db.any(qrs_NguoiLienQuan);
        const DSNguoiLienDoi = await db.any(qrs_NguoiLienDoi);
        const DSLichSuDuocQuanLy = await db.any(qrs_LichSuDuocQuanLy);
        userDetail.detail = ChiTietNguoiLienQuan[0];
        userDetail.DSNguoiLienDoi = DSNguoiLienDoi;
        userDetail.DSLichSuDuocQuanLy = DSLichSuDuocQuanLy;
        return userDetail;
    } catch (error) {
        console.log(error);
        return null;
    }
}

exports.updateUser = async(entity, value) => {
    const table = new pgp.helpers.TableName({ table: NLQ, schema: schema });
    const condition = pgp.as.format(' WHERE "MaNguoiLienQuan" = $1', [value]);
    const qStr = pgp.helpers.update(entity, null, table) + condition + " RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}

exports.createUser = async(entity) => {
    const table = new pgp.helpers.TableName({ table: NLQ, schema: schema });
    const qStr = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}

exports.loadProfile = async(value, tbName) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "MaNguoiLienQuan" = $2`, [table, value]);
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};
exports.loadHistory = async(value, tbName) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "NguoiLienQuan" = $2`, [table, value]);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};

exports.loadIsoPlace = async(value, tbName) => {
    const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "MaNoiDTCL" = $2`, [table, value]);
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
};