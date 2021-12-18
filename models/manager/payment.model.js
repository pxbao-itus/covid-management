const db = require('../payment');

const tbName = 'TaiKhoanNguoiQuanLy';

module.exports = {
    update: async (entity) => {
        const res = await db.updateLimit(entity, tbName);
        return res;
    }
}

module.exports = {
    accept: async (arrayId) => {
        const res = await db.acceptPayment(arrayId);
        return res;
    }
}


