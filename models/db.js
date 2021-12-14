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

const NYP = 'NhuyeuPham';
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
    const qStr = pgp.as.format('DELETE FROM $1 WHERE "MaNYP" = $2', [table, value]);
    try {
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