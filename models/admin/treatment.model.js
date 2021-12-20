const db = require('../treatment');


module.exports = {
    list: async () => {
        const res = await db.list();
        return res;
    },
    get: async (treatmentId) => {
        const res = await db.get(treatmentId);
        return res;
    },
    update: async (treatmentId, entity) => {
        const res = await db.update(treatmentId, entity);
        return res;
    },
    add: async (entity) => {
        const res = await db.insert(entity);
        return res;
    }
}