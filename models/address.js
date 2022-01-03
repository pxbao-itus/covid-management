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