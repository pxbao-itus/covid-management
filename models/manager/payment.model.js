const db = require('../payment');

module.exports = {
    update: async (entity) => {
        const res = await db.updateLimit(entity);
        return res;
    },

    accept: async (arrayId) => {
        const res = await db.acceptPayment(arrayId);
        return res;
    },

    list: async (value) => {
        const res = await db.loadHistory(value);
        return res;
    },
    announce: async (value) => {
        const res = await db.announcePayment(value);
        return res;
    },

    create: async (entity, value) => {
        const res = await db.createPayment(entity, value);
        return res;
    },

    get: async (value) => {
        const res = await db.getAccount(value);
        return res;
    },

    recharge: async (entity, value) => {
        const res = await db.rechargeMoney(entity, value);
        return res;
    },
};

