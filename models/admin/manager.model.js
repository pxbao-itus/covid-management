const db = require('../manager')

module.exports = {
    create: async (entity) => {
        const res = await db.createManagerAccount(entity);
        return res;
    },
    list: async () => {
        try {
            const res = await db.listManagerAccount();
            return res;
        } catch (error) {
            console.log(error)
        }
        
    },
    history: async (value) => {
        const res = await db.historyManagerAction(value);
        return res;
    },
    delete: async (value) => {
        const res = await db.deleteManagerAccount(value);
        return res;
    },
    update: async (entity, value) => {
        const res = await db.updateManagerAccount(entity, value);
        return res;
    },
    get: async (value) => {
        const res = await db.getManager(value);
        if(res.length > 0) {
            return res[0];
        } 
        return null;
    }
}