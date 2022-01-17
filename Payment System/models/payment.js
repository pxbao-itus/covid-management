require("dotenv").config();
const db = require("./db");
const pgp = require("pg-promise")({
  capSQL: true,
});
const schema = "public";

const TKND = "TaiKhoanNguoiDungHTTT";
const TKTT = "TaiKhoanThanhToan";
const LSTT = "LichSuThanhToan";

exports.getLoan = async (value, tbName) => {
  const table = new pgp.helpers.TableName({ table: tbName, schema: schema });
  const qStr = pgp.as.format('SELECT * FROM $1 WHERE "NguoiLienQuan" = $2', [
    table,
    value,
  ]);
  try {
    const res = await db.one(qStr);
    return res;
  } catch (error) {
    console.log(error);
  }
};

exports.createPayment = async (entity, value) => {
  const table_TKND = new pgp.helpers.TableName({ table: TKND, schema: schema });
  const table_TKTT = new pgp.helpers.TableName({ table: TKTT, schema: schema });
  const qStr_balance = pgp.as.format(
    `SELECT "SoDu" FROM $1 "B1" INNER JOIN $2 "B2" 
  ON "B1"."MaTaiKhoan" = "B2"."MaTaiKhoan"  WHERE "B1"."Username" = $3`,
    [table_TKND, table_TKTT, value]
  );
  const table_LSTT = new pgp.helpers.TableName({ table: LSTT, schema: schema });
  const qStr_payment =
    pgp.helpers.insert(entity, null, table_LSTT) + "RETURNING *";
  try {
    const balance = await db.one(qStr_balance);
    if (balance.SoDu >= entity.SoTien) {
      const res = await db.one(qStr_payment);
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.rechargeMoney = async (entity, value) => {
  const table_TKTT = new pgp.helpers.TableName({ table: TKTT, schema: schema });
  try {
    const qStr_bal = pgp.as.format(
      'SELECT "SoDu" FROM $1 WHERE "MaTaiKhoan" = $2',
      [table_TKTT, value]
    );
    const currentBal = await db.one(qStr_bal);
    entity.SoDu = parseInt(entity.SoDu) + parseInt(currentBal.SoDu);
    const condition = pgp.as.format(' WHERE "MaTaiKhoan" = $1', value);
    const qStr_rechage =
      pgp.helpers.update(entity, null, table_TKTT) + condition + " RETURNING *";
    const res = await db.one(qStr_rechage);
    return res;
  } catch (error) {
    console.log(error);
  }
};
