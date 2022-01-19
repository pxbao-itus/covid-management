require('dotenv').config();
const db=require('./db');
const pgp=require('pg-promise')({
    capSQL: true,
})
const schema='public';

exports.getAccount=async (value,tbName) => {
    const table=new pgp.helpers.TableName({table: tbName,schema: schema});
    const qStr=pgp.as.format('SELECT * FROM $1 WHERE "Username" = $2',[table,value]);
    try {
        const res=await db.one(qStr)
        return res;
    } catch(error) {
        console.log(error);
    }
}

exports.getBalance=async (value,tbName) => {
    const table=new pgp.helpers.TableName({table: tbName,schema: schema});
    const qStr=pgp.as.format('SELECT * FROM $1 WHERE "MaTaiKhoan" = $2',[table,value]);
    try {
        const res=await db.one(qStr)
        return res;
    } catch(error) {
        console.log(error);
    }
}