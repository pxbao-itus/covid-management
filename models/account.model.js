const db = require('./account');
const fieldName = 'Username';
module.exports = {
    all: async (tableName) => {
        const res = await db.loadAccount(tableName);
        return res;
    },
    get: async (tableName, value) => {
        const res = await db.getAccount(tableName, fieldName, value);
        if(res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    },
    add: async (tableName, entity) => {
        const res = await db.addAccount(tableName, entity);
        return res;
    },
    update: async (tableName, entity,value) => {
        const res = await db.updateAccount(tableName, entity, value);
        return res;
    }
}