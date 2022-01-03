const db = require('../product');

module.exports = {
    list: async () => {
        const res = await db.listProduct();
        return res;
    },
}