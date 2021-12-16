const db = require('../order');


module.exports = {
    create: async (order, orderDetal) => {
        const res = await db.createOrder(order, orderDetal);
        return res;
    },
    list: async (userid) => {
        const res = await db.listOrder(userid);
        return res;
    },
    detail: async (userid, historyid) => {
        const res = await db.orderDetail(userid, historyid);
        return res;
    }
}