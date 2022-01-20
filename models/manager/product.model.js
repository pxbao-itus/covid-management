const db = require('../product');

module.exports = {
    list: async() => {
        const res = await db.listProduct();
        return res;
    },
    delete: async(value) => {
        const res = await db.deleteProduct(value);
        return res;
    },
    detail: async(value) => {
        const res = await db.detailProduct(value);
        if (res && res.length > 0) {
            return res[0];
        } else {
            return null;
        }
    },
    update: async(entity, value) => {
        const res = await db.updateProduct(entity, value);
        return res;
    },
    create: async(entity) => {
        const res = await db.createProduct(entity);
        return res;
    }
}