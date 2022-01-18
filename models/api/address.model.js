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
    },
    getProvince: async (provinceId) => {
        const res = await db.getProvince(provinceId);
        return res;
    },
    getDistrict: async (districtId) => {
        const res = await db.getDistrict(districtId);
        return res;
    },
    getWard: async (wardId) => {
        const res = await db.getWard(wardId);
        return res;
    },
}