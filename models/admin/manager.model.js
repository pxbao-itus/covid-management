const db = require('../account')

module.exports = {
    create: async (entity) => {
        const res = await db.createManagerAccount(entity);
        return res;
    },
    list: async () => {
        const res = await db.listManagerAccount();
        return res;
    },
    history: async (value) => {
        const res = await db.historyManagerAction(value);
        return res;
    },
    delete: async (value) => {
        const res = await db.deleteManagerAccount(value);
        return res;
    },
    update: async (entity, value) => {
        const res = await db.updateManagerAccount(entity, value);
        return res;
    }
}