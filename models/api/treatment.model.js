const db = require('../treatment');


module.exports = {
    list: async () => {
        const res = await db.list();
        return res;
    },
}