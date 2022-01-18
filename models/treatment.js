require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';

const NoiDieuTriCachLy = 'NoiDieuTriCachLy';


exports.list = async () => {
    const table = new pgp.helpers.TableName({table: NoiDieuTriCachLy, schema: schema});
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        return [];
    }
}
exports.get = async (treatmentId) => {
    const table = new pgp.helpers.TableName({table: NoiDieuTriCachLy, schema: schema});
    const qStr = pgp.as.format(`SELECT * FROM $1 WHERE "MaNoiDTCL" = '${treatmentId}'`, table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        return null;
    }
}
exports.update = async (treatmentId, entity) => {
    const table = new pgp.helpers.TableName({table: NoiDieuTriCachLy, schema: schema});
    const condition = pgp.as.format(' WHERE "MaNoiDTCL" = $1', [treatmentId]);
    const qStr = pgp.helpers.update(entity, null, table) + condition + " RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        return false;
    }
}
exports.insert = async (entity) => {
    const table = new pgp.helpers.TableName({table: NoiDieuTriCachLy, schema: schema}); 
    const qStr = pgp.helpers.insert(entity, null, table) + "RETURNING *";
    try {
        const res = await db.one(qStr);
        return res;
    } catch (error) {
        return null;
    }
}