const db = require('../user');


module.exports = {
    list: async () => {
        const res = await db.loadListUser();
        return res;
    },
    detail: async (value) => {
        const res = await db.viewDetailUser(value);
        return res;
    },
    update: async (entity, value) => {
        const res = await db.updateUser(entity, value);
        return res;
    },

    create: async (entity) => {
        const res = await db.createUser(entity);
        return res;
    },

    get: async (value) => {
        const res = await db.loadProfile(value);
        return res;
    },

    history: async (value) => {
        const res = await db.loadHistory(value);
        return res;
    },

};

