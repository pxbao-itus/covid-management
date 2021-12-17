const db = require('../user');

const tbName = 'NguoiLienQuan';

module.exports = {
    list: async () => {
        const res = await db.loadListUser(tbName);
        return res;
    },
    detail: async (id) => {
        const res = await db.viewDetailUser(id);
        return res;
    },
    update: async (entity, value) => {
        const res = await db.updateUser(entity, value);
        return res;
    },

    create: async (entity) => {
        const res = await db.createUser(entity);
        return res;
    }

};

