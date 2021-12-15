const db = require('../order');


module.exports = {
    create: async (order, orderDetal) => {
        const res = db.createOrder(order, orderDetal);
        return res;
    },
    list: async (userid) => {
        const res = db.listOrder(userid);
        return res;
    },
    detail: async (userid, historyid) => {
        const res = db.orderDetail(userid, historyid);
        return res;
    }
}