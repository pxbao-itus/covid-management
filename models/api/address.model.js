const db = require('../address');

module.exports = {
    province: async () => {
        const res = await db.listProvince();
        return res;
    },
    district: async (provinceId) => {
        const res = await db.getDistricts(provinceId);
        return res;
    },
    ward: async (districtId) => {
        const res = await db.getWards(districtId);
        return res;
    }
}