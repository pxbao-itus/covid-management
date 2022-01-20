require('dotenv').config();
const db = require('./db');
const pgp = require('pg-promise')({
    capSQL: true,
})
const schema = 'public';


// Table
const NYP = 'NhuYeuPham';
const GoiNYP = 'GoiNhuYeuPham';
const ChiTietGoiNYP = 'ChiTietGoiNYP';
const TaiKhoanNguoiQuanLy = 'TaiKhoanNguoiQuanLy';
const LichSuNguoiQuanLy = 'LichSuNguoiQuanLy';



// exports for pakage for manager
exports.listPackage = async() => {
    const table = new pgp.helpers.TableName({ table: GoiNYP, schema: schema });
    const qStr = pgp.as.format('SELECT * FROM $1', table);
    try {
        const res = await db.any(qStr);
        return res;
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports.deletePackage = async(value) => {
    const table = new pgp.helpers.TableName({ table: GoiNYP, schema: schema });
    const qStr = pgp.as.format('DELETE FROM $1 WHERE "MaGoiNYP" = $2', [table, value]);
    try {
        await db.none(qStr);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
exports.detailPackage = async(value) => {
    const detail = new pgp.helpers.TableName({ table: ChiTietGoiNYP, schema: schema });
    const product = new pgp.helpers.TableName({ table: NYP, schema: schema });
    const qStr = pgp.as.format('SELECT * FROM $1 NATURAL JOIN $2 WHERE "MaGoiNYP" = $3', [product, detail, value]);
    const package = new pgp.helpers.TableName({ table: GoiNYP, schema: schema });
    const qStr1 = pgp.as.format('SELECT * FROM $1 WHERE "MaGoiNYP" = $2', [package, value]);
    try {
        const resultDetail = await db.any(qStr);
        const resultPackage = await db.one(qStr1);
        return {
            package: resultPackage,
            details: resultDetail
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
exports.updatePackage = async(package, details, oldman, value) => {
    const table = new pgp.helpers.TableName({ table: GoiNYP, schema: schema });
    const detail = new pgp.helpers.TableName({ table: ChiTietGoiNYP, schema: schema });
    const condition = pgp.as.format(' WHERE "MaGoiNYP" = $1', [value]);
    const qStr = pgp.helpers.update(package, null, table) + condition + " RETURNING *";
    // oldman = Object.entries(oldman);
    console.log("-------OLD--------")
    console.log(oldman)
    oldman = Object.values(oldman)
    console.log("-------OLD--------")

    try {
        const resultPackage = await db.one(qStr);
        if (details.length > 0) {
            for (const item of details) {
                const entity = {
                    MaGoiNYP: resultPackage.MaGoiNYP,
                    MaNYP: item.MaNYP,
                    SoLuong: item.SoLuong,
                    SoLuongToiDa: item.SoLuongToiDa,
                    SoLuongToiThieu: item.SoLuongToiThieu
                }
                let qStrDetail;

                if (item.MaChiTietGoiNYP) {
                    let IsFind = oldman.find(x => x.MaNYP == item.MaNYP);
                    oldman.splice(oldman.indexOf(IsFind), 1);
                    let conditionDetail = pgp.as.format(' WHERE "MaChiTietGoiNYP" = $1 ', [item.MaChiTietGoiNYP]);
                    qStrDetail = pgp.helpers.update(entity, null, detail) + conditionDetail + " RETURNING *";
                } else {
                    qStrDetail = pgp.helpers.insert(entity, null, detail) + " RETURNING *";
                }
                console.log(qStrDetail)
                const resultDetail = await db.one(qStrDetail);
            }

            for (const item of oldman) {
                const qStr = pgp.as.format('DELETE FROM $1 WHERE "MaChiTietGoiNYP" = $2', [detail, item.MaChiTietGoiNYP]);
                const resultDetail = await db.none(qStr);

            }
        }

        // if (oldman.length > 0) {
        //     for (let item of oldman) {
        //         //item = item[0]
        //         console.log("-------------------")
        //         console.log(item.MaChiTietGoiNYP)

        //         const entity = {
        //             MaGoiNYP: resultPackage.MaGoiNYP,
        //             MaNYP: item.MaNYP,
        //             SoLuong: item.SoLuong,
        //             SoLuongToiDa: item.SoLuongToiDa,
        //             SoLuongToiThieu: item.SoLuongToiThieu
        //         }


        //     }
        // }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
exports.createPackage = async(package, details) => {

    const table = new pgp.helpers.TableName({ table: GoiNYP, schema: schema });
    const detail = new pgp.helpers.TableName({ table: ChiTietGoiNYP, schema: schema });
    const qStr = pgp.helpers.insert(package, null, table) + "RETURNING *";

    try {
        const resultPackage = await db.one(qStr);
        const getPackage = pgp.as.format(`SELECT * FROM $1 WHERE "MaGoiNYP" = '${resultPackage.MaGoiNYP}' LIMIT 1`, table);
        const resultGetPackage = await db.any(getPackage);
        if (details.length > 0) {
            for (const item of details) {
                const entity = {
                    MaGoiNYP: resultPackage.MaGoiNYP,
                    MaNYP: item.MaNYP,
                    SoLuong: item.SoLuong,
                    SoLuongToiDa: item.SoLuongToiDa,
                    SoLuongToiThieu: item.SoLuongToiThieu
                }
                console.log(entity)
                const qStrDetail = pgp.helpers.insert(entity, null, detail) + "RETURNING *";
                const resultDetail = await db.one(qStrDetail);
            }
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}