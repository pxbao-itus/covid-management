const db = require('../statistic');



module.exports = {
    listUserStatus: async () => {
        const res = await db.loadStatusUsers();
        return res;
    },
    listChangeStatus: async () => {
        const res = await db.loadChangeStatus();
        return res;
    },
    listConsumPackage: async () => {
        const res = await db.loadConsumPackage();
        return res;
    },
    listProduct: async () => {
        const res = await db.loadListProduct();
        return res;
    },
    Payment: async () => {
        const res = await db.loadPayment();
        return res;
    },

}