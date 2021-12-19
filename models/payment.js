require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';

const QuanLyThanhToan = 'QuanLyThanhToan';
const TKQL = 'TaiKhoanNguoiQuanLy';
const LSTT = 'LichSuThanhToan';

exports.updateLimit = async (entity, tbName) => {
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

exports.acceptPayment = async (arrayId) => {
    const table_LSTT = new pgp.helpers.TableName({ table: LSTT, schema: schema });
    var condStr = ' WHERE ';
    for (const cond of arrayId) {
        condStr += `"MaLSTT" = ` + cond;
        if (arrayId[arrayId.length - 1] != cond) {
            condStr += ' OR ';
        }
    }
    console.log(condStr);
    const condition = pgp.as.format(condStr);
    const entity = { TrangThai: 1 }
    try {
        const qStr_update = pgp.helpers.update(entity, null, LSTT) + condition + " RETURNING *";
        const res = await db.any(qStr_update)
        return res;
    } catch (error) {
        console.log(error);
    }
}