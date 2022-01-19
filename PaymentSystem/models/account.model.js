const db=require('./account');

const TKND='TaiKhoanNguoiDungHTTT';
const TKTT='TaiKhoanThanhToan';

module.exports = {
  list: async (value) => {
    const res = await db.loadHistory(value);
    return res;
  },

  create: async (entity, value) => {
    const res = await db.createPayment(entity, value);
    return res;
  },

  get: async (value) => {
    const res = await db.getAccount(value, TKND);
    return res;
  },

  getBalance: async (value) => {
    const res = await db.getBalance(value, TKTT);
    return res;
  },

  updatePassword: async (entity, value) => {
    const res = await db.updatePassword(entity, value, TKND);
    return res;
  },
};

