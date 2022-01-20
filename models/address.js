require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';

// table
const Tinh = 'Tinh';
const Huyen = 'Huyen';
const Xa = 'Xa';


exports.listProvince = async () => {
    const table = new pgp.helpers.TableName({table: Tinh, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return [];
    }
}

exports.getDistricts = async (provinceId) => {
    const table = new pgp.helpers.TableName({table: Huyen, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "Tinh" = '${provinceId}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        return [];
    }
}

exports.getWards = async (districtId) => {
    const table = new pgp.helpers.TableName({table: Xa, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "Huyen" = '${districtId}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        return [];
    }
}

exports.getProvince = async (provinceId) => {
    const table = new pgp.helpers.TableName({table: Tinh, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1 WHERE "MaTinh" = $2', [table, provinceId]);
    try {
        const res = await db.any(qStr);
        if(res.length > 0) {
            return res[0];
        } 
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

exports.getDistrict = async (districtId) => {
    const table = new pgp.helpers.TableName({table: Huyen, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1 WHERE "MaHuyen" = $2', [table, districtId]);
    try {
        const res = await db.any(qStr);
        if(res.length > 0) {
            return res[0];
        } 
        return null;
    } catch (error) {
        return null;
    }
}

exports.getWard = async (wardId) => {
    const table = new pgp.helpers.TableName({table: Xa, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1 WHERE "MaXa" = $2', [table, wardId]);
    try {
        const res = await db.any(qStr);
        if(res.length > 0) {
            return res[0];
        } 
        return null;
    } catch (error) {
        return null;
    }
}