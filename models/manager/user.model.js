const db = require('../user');

const tbUser='NguoiLienQuan';
const tbHistoryManager='LichSuDuocQuanLy';
const tbIsolationPlace='NoiDieuTriCachLy';
const tbAccountUser = "TaiKhoanNguoiDung";

module.exports = {
  list: async () => {
    const res = await db.loadListUser();
    return res;
  },
  detail: async (value) => {
    const res = await db.viewDetailUser(value);
    return res;
  },
  update: async (entity, value) => {
    const res = await db.updateUser(entity, value);
    return res;
  },

  create: async (entity) => {
    const res = await db.createUser(entity);
    return res;
  },

  createAccount: async (entity) => {
    const res = await db.createAccount(entity, tbAccountUser);
    return res;
  },

  get: async (value) => {
    const res = await db.loadProfile(value, tbUser);
    return res;
  },

  history: async (value) => {
    const res = await db.loadHistory(value, tbHistoryManager);
    return res;
  },

  place: async (value) => {
    const res = await db.loadIsoPlace(value, tbIsolationPlace);
    return res;
  },
};

