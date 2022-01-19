const db = require("./payment");

const tbLoan = "SoDuNo";

module.exports = {
  getLoan: async (value) => {
    const res = await db.getLoan(value, tbLoan);
    return res;
  },

  create: async (entity, value) => {
    const res = await db.createPayment(entity, value);
    return res;
  },

  recharge: async (entity, value) => {
    const res = await db.rechargeMoney(entity, value);
    return res;
  },
};
