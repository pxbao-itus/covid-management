const db = require('../package');

module.exports = {
    list: async() => {
        const res = await db.listPackage();
        return res;
    },
    delete: async(value) => {
        const res = await db.deletePackage(value);
        return res;
    },
    detail: async(value) => {
        const res = await db.detailPackage(value);
        return res;
    },
    update: async(package, details, oldman, value) => {
        const res = await db.updatePackage(package, details, oldman, value);
        return res;
    },
    create: async(package, details) => {
        const res = await db.createPackage(package, details);
        return res;
    }
}