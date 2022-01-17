const db = require('../order');
const pm = require('../payment');

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
        return res;;
    },
    getLoan: async (userId) => {
        const res  = await pm.getLoan(userId);
        if(res.length > 0) {
            return res[0];
        }
        return null;
    },
    getLevel: async () => {
        const res  = await pm.getLevel();
        if(res.length > 0) {
            return res[res.length - 1];
        }
        return null;
    }
}