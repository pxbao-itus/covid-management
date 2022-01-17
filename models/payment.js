require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';

const QuanLyThanhToan = 'QuanLyThanhToan';
const TKQL = 'TaiKhoanNguoiQuanLy';
const LSTT = 'LichSuThanhToan';
const SDN = 'SoDuNo';
const TKND = 'TaiKhoanNguoiDungHTTT';
const TKTT = 'TaiKhoanThanhToan';

exports.updateLimit = async (entity) => {
    const table_TKQL = new pgp.helpers.TableName({ table: TKQL, schema: schema });
    const qStr_Id = pgp.as.format('SELECT "MaTaiKhoan" FROM $1 WHERE "Username" = CURRENT_USER', table_TKQL);
    var today = new Date();
    entity.ThoiGianCapNhat = today;

    try {
        const id = await db.one(qStr_Id);
        entity.NguoiCapNhat = id.MaTaiKhoan;
        const qStr_update = pgp.helpers.update(entity, null, QuanLyThanhToan) + " RETURNING *";
        const res = await db.one(qStr_update)
        return res;
    } catch (error) {
        console.log(error);
    }
}

// exports.acceptPayment = async (arrayId) => {
//     const table_LSTT = new pgp.helpers.TableName({ table: LSTT, schema: schema });
//     var condStr = ' WHERE ';
//     for (const cond of arrayId) {
//         condStr += `"MaLSTT" = ` + cond;
//         if (arrayId[arrayId.length - 1] != cond) {
//             condStr += ' OR ';
//         }
//     }
//     const condition = pgp.as.format(condStr);
//     const entity = { TrangThai: 1 }
//     try {
//         const qStr_update = pgp.helpers.update(entity, null, LSTT) + condition + " RETURNING *";
//         const res = await db.any(qStr_update)
//         return res;
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.loadHistory = async (value) => {
    const table = new pgp.helpers.TableName({ table: LSTT, schema: schema });
    const qStr = pgp.as.format('SELECT * FROM $1 WHERE "NguoiLienQuan" = $2', [table, value]);

    try {
        const res = await db.any(qStr)
        return res;
    } catch (error) {
        console.log(error);
    }
}

exports.announcePayment = async (value) => {
    const table_QLTT = new pgp.helpers.TableName({ table: QuanLyThanhToan, schema: schema });
    const table_SDN = new pgp.helpers.TableName({ table: SDN, schema: schema });
    const qStr_limit = pgp.as.format('SELECT "HanMuc" FROM $1', table_QLTT);
    const qStr_loan = pgp.as.format('SELECT "SoDuNo" FROM $1 WHERE "NguoiLienQuan" = $2', [table_SDN, value]);
    try {
        const limit = await db.one(qStr_limit);
        const loan = await db.one(qStr_loan);
        if (loan.SoDuNo > limit.HanMuc) {
            const res = {};
            res.limit = limit.HanMuc;
            res.loan = loan.SoDuNo;
            return res;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}

exports.createPayment = async (entity, value) => {
    const table_TKND = new pgp.helpers.TableName({ table: TKND, schema: schema });
    const table_TKTT = new pgp.helpers.TableName({ table: TKTT, schema: schema });
    const qStr_balance = pgp.as.format(`SELECT "SoDu" FROM $1 "B1" INNER JOIN $2 "B2" 
    ON "B1"."MaTaiKhoan" = "B2"."MaTaiKhoan"  WHERE "B1"."Username" = $3`, [table_TKND, table_TKTT, value]);
    const table_LSTT = new pgp.helpers.TableName({ table: LSTT, schema: schema });
    const qStr_payment = pgp.helpers.insert(entity, null, table_LSTT) + "RETURNING *";
    try {
        const balance = await db.one(qStr_balance);
        if (balance.SoDu >= entity.SoTien) {
            const res = await db.one(qStr_payment);
            return res;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getAccount = async (value) => {
    const table = new pgp.helpers.TableName({ table: TKND, schema: schema });
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "Username" = '${value}'`, table);
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        console.log(error);
    }
}
exports.rechargeMoney = async (entity, value) => {
    const table_TKTT = new pgp.helpers.TableName({ table: TKTT, schema: schema });
    try {
        const qStr_bal = pgp.as.format('SELECT "SoDu" FROM $1 WHERE "MaTaiKhoan" = $2', [table_TKTT, value]);
        const currentBal = await db.one(qStr_bal);
        entity.SoDu = parseInt(entity.SoDu) + parseInt(currentBal.SoDu);
        const condition = pgp.as.format(' WHERE "MaTaiKhoan" = $1', value);
        const qStr_rechage = pgp.helpers.update(entity, null, table_TKTT) + condition + " RETURNING *";
        const res = await db.one(qStr_rechage);
        return res;
    } catch (error) {
        console.log(error);
    }
}



