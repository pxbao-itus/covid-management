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

// exports for product for manager
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

// exports for pakage for manager
exports.listPackage = async () => {
    const table = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports.deletePackage = async (value) => {
    const table = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const qStr = pgp.as.format('DELETE FROM $1 WHERE "MaGoiNYP" = $2', [table, value]);
    try {
        await db.none(qStr);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
exports.detailPackage = async (value) => {
    const detail = new pgp.helpers.TableName({table: ChiTietGoiNYP, schema: schema});
    const product = new pgp.helpers.TableName({table: NYP, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1 NATURAL JOIN $2 WHERE "MaGoiNYP" = $3', [product, detail, value] );
    const package = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const qStr1 = pgp.as.format('SELECT * FROM $1 WHERE "MaGoiNYP" = $2', [package, value]);
    try {
        const resultDetail = await db.any(qStr);
        const resultPackage = await db.one(qStr1);
        return {
            package: resultPackage,
            details: resultDetail
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports.updatePackage = async (package, details, value) => {
    const table = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const detail = new pgp.helpers.TableName({table: ChiTietGoiNYP, schema: schema});
    const condition = pgp.as.format(' WHERE "MaGoiNYP" = $1', [value]);
    const qStr = pgp.helpers.update(package, null, table) + condition + " RETURNING *";
    try {
        const resultPackage = await pg.one(qStr);
        for (const item of details) {
            const entity = {
                MaGoiNYP: item.MaGoiNYP,
                MaNYP: item.MaNYP,
                SoLuong: item.SoLuong,
                SoLuongToiDa: item.SoLuongToiDa,
                SoLuongToiThieu = item.SoLuongToiThieu
            }
            const conditionDetail = pgp.as.format(' WHERE "MaChiTietGoiNYP" = $1', [item.MaChiTietGoiNYP]);
            const qStrDetail = pgp.helpers.update(entity, null, detail) + conditionDetail + " RETURNING *";
            const resultDetail = await pg.one(qStrDetail);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
exports.createPackage = async (package, details) => {

    const table = new pgp.helpers.TableName({table: GoiNYP, schema: schema});
    const detail = new pgp.helpers.TableName({table: ChiTietGoiNYP, schema: schema});
    const qStr = pgp.helpers.insert(package, null, table) + "RETURNING *";
    
    try {
        const resultPackage = await pg.one(qStr);
        const getPackage = pgp.as.format(`SELECT * FROM $1 WHERE "MaGoiNYP" = '${resultPackage.MaGoiNYP}' LIMIT 1`, table);
        const resultGetPackage = await pg.any(getPackage);
        for (const item of details) {
            const entity = {
                MaGoiNYP: resultGetPackage.MaGoiNYP,
                MaNYP: item.MaNYP,
                SoLuong: item.SoLuong,
                SoLuongToiDa: item.SoLuongToiDa,
                SoLuongToiThieu = item.SoLuongToiThieu
            }
            const qStrDetail = pgp.helpers.insert(entity, null, table) + "RETURNING *";
            const resultDetail = await pg.one(qStrDetail);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


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

