const product = require("express").Router();
var upload = require('../../config/upload.config');

const productModel = require("../../models/manager/product.model");


product.get("/list", async(req, res) => {
    try {
        let result = await productModel.list();
        let resultPagnition = [];
        if (req.query.search) {
            result = result.filter(item => {
                return (item.TenNYP.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0);
            })
        }
        if (req.query.sort && req.query.order) {
            if (req.query.sort === 'price') {
                if (req.query.order === 'increase') {
                    result = result.sort((item1, item2) => {
                        return item1.DonGia - item2.DonGia;
                    })
                }
                if (req.query.order === 'decrease') {
                    result = result.sort((item1, item2) => {
                        return item2.DonGia - item1.DonGia;
                    })
                }
            }
        }
        if (req.query.start || req.query.end) {
            result = result.filter(item => {
                let status1 = true;
                let status2 = true;
                if (req.query.start) {
                    status1 = item.DonGia >= req.query.start;
                }
                if (req.query.end) {
                    status2 = item.DonGia <= req.query.end;
                }
                return status1 && status2;
            })
        }


        let pagnition = [];
        for (let index = 1; index <= ((result.length - result.length % 8) / 8); index++) {
            pagnition.push(index);
        }
        if (result.length % 8 > 0) {
            pagnition.push(((result.length - result.length % 8) / 8) + 1);
        }
        if (req.query.page) {
            for (let index = 8 * (req.query.page - 1); index < 8 * req.query.page; index++) {
                if (result[index]) {
                    resultPagnition.push(result[index]);
                } else {
                    break;
                }

            }
        } else {
            for (let index = 0; index < 8; index++) {
                if (result[index]) {
                    resultPagnition.push(result[index]);
                } else {
                    break;
                }
            }
        }
        let msg = req.cookies.msg;
        return res.render("./manager/product/list", {
            products: resultPagnition,
            msg: msg,
            path: req.originalUrl,
        });
    } catch (error) {
        return res.render("./manager/product/list", {
            products: [],
            path: req.originalUrl,
        });
    }

});
product.get("/listAll", async(req, res) => {
    try {
        let result = await productModel.list();
        return res.send(result)
    } catch (e) {

    }
});
product.post("/list", async(req, res) => {
    try {
        let result = await productModel.list();
        let resultPagnition = [];
        if (req.query.search) {
            result = result.filter(item => {
                return (item.TenNYP.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0);
            })
        }
        if (req.query.sort && req.query.order) {
            if (req.query.sort === 'price') {
                if (req.query.order === 'increase') {
                    result = result.sort((item1, item2) => {
                        return item1.DonGia - item2.DonGia;
                    })
                }
                if (req.query.order === 'decrease') {
                    result = result.sort((item1, item2) => {
                        return item2.DonGia - item1.DonGia;
                    })
                }
            }
        }
        if (req.query.start || req.query.end) {
            result = result.filter(item => {
                let status1 = true;
                let status2 = true;
                if (req.query.start) {
                    status1 = item.DonGia >= req.query.start;
                }
                if (req.query.end) {
                    status2 = item.DonGia <= req.query.end;
                }
                return status1 && status2;
            })
        }


        let pagnition = [];
        for (let index = 1; index <= ((result.length - result.length % 8) / 8); index++) {
            pagnition.push(index);
        }
        if (result.length % 8 > 0) {
            pagnition.push(((result.length - result.length % 8) / 8) + 1);
        }
        if (req.query.page) {
            for (let index = 8 * (req.query.page - 1); index < 8 * req.query.page; index++) {
                if (result[index]) {
                    resultPagnition.push(result[index]);
                } else {
                    break;
                }

            }
        } else {
            for (let index = 0; index < 8; index++) {
                if (result[index]) {
                    resultPagnition.push(result[index]);
                } else {
                    break;
                }
            }
        }

        return res.send({ resultPagnition: resultPagnition, length: result.length });
        return res.render("./manager/product/list", {
            products: resultPagnition,
            path: req.originalUrl,
        });
    } catch (error) {
        return res.render("./manager/product/list", {
            products: [],
            path: req.originalUrl,
        });
    }

});
product.get("/list/ajax", async(req, res) => {
    const products = await productModel.list();
    return res.send(products);
});

product.get("/delete", async(req, res) => {
    try {
        const MaNYP = req.query.id;
        const result = await productModel.delete(MaNYP);
        res.cookie('msg', 'Xóa thành công!', { maxAge: 2000 })
        return res.redirect("/manager/product/list")
    } catch (error) {
        res.cookie('msg', 'Xóa thất bại!')
        return res.redirect("/manager/product/list")
    }

});

product.get("/detail", async(req, res) => {

    const MaNYP = req.query.id;
    try {
        const result = await productModel.detail(MaNYP);
        if (result) {
            return res.render("manager/product/detail", {
                product: result,
                path: "/manager/product/detail",
            });
        }
        return res.redirect("/manager/product/list");
    } catch (e) {

    }
});
product.post("/detail", async(req, res) => {
    const MaNYP = req.body.id;
    try {
        const result = await productModel.detail(MaNYP);
        if (result) {
            return res.send(result);
        }
    } catch (error) {
        return res.send(null);
    }
});
const fs = require('fs/promises')
product.post("/update", upload.array("files", 4), async(req, res) => {
    const productUpdated = req.body;
    console.log((req.files))
    let uploadedFile = req.body.uploadedFile.split(',');
    let deletedFile = req.body.deletedFile.split(',');

    console.log(uploadedFile)
    console.log(deletedFile)
    for (const element of deletedFile) {
        fs.rm(__dirname.split('controllers')[0] + 'public/images/' + element, { force: true })
        console.log(__dirname.split('controllers')[0] + 'public/images/' + element)
    }
    try {
        const entity = {
            TenNYP: productUpdated.TenNYP,
            HinhAnh1: req.files[0] ? req.files[0].filename : uploadedFile[3],
            HinhAnh2: req.files[1] ? req.files[1].filename : uploadedFile[2],
            HinhAnh3: req.files[2] ? req.files[2].filename : uploadedFile[1],
            HinhAnh4: req.files[3] ? req.files[3].filename : uploadedFile[0],
            DonGia: parseInt(productUpdated.DonGia),
            DonViDinhLuong: productUpdated.DonViDinhLuong,
        };
        console.log("----------------------")
            // console.log(entity)
        const result = await productModel.update(entity, productUpdated.id);
        return res.redirect(`/manager/product/detail?id=${productUpdated.id}`);
    } catch (error) {
        return res.redirect(`/manager/product/detail?id=${productUpdated.id}`);
    }
});
product.get("/create", async(req, res) => {
    let message = "";
    // if (req.cookies("createProduct")) {
    //     //message = req.cookies("create");
    // }
    return res.render("manager/productCreate", {
        msg: message,
    });
});
product.post("/create", upload.array("files", 4), async(req, res) => {
    console.log(req.files[0])

    try {
        const entity = {
            TenNYP: req.body.ten,
            HinhAnh1: req.files[0] ? req.files[0].filename : "",
            HinhAnh2: req.files[1] ? req.files[1].filename : "",
            HinhAnh3: req.files[2] ? req.files[2].filename : "",
            HinhAnh4: req.files[3] ? req.files[3].filename : "",
            DonGia: req.body.dongia,
            DonViDinhLuong: req.body.donvi,
        };
        const result = await productModel.create(entity);
        if (result) {

            // res.cookie("createProduct", "Thêm nhu yếu phẩm thành công.");
        } else {
            // res.cookie("createProduct", "Thêm nhu yếu phẩm không thành công.");
        }
        return res.redirect("/manager/product/create");
    } catch (e) {
        console.log(e)
        return res.redirect("/manager/product/create");
    }
});
// product.post("/update", async(req, res) => {
//     const productUpdated = req.body;
//     try {
//         const entity = {
//             TenNYP: productUpdated.ten,
//             HinhAnh1: req.files[0].filename,
//             HinhAnh2: req.files[1].filename,
//             HinhAnh3: req.files[2].filename,
//             HinhAnh4: req.files[3].filename,
//             DonGia: productUpdated.dongia,
//             DonViDinhLuong: productUpdated.donvi,
//         };
//         const result = await productModel.update(entity, productUpdated.id);
//         return res.redirect(`/manager/product/detail?id=${productUpdated.id}`);
//     } catch (error) {
//         return res.redirect(`/manager/product/detail?id=${productUpdated.id}`);
//     }
// });
product.get("/create", async(req, res) => {
    let message = "";

    return res.render("manager/productCreate", {
        msg: message,
    });
});
product.post("/create", upload.array("files", 4), async(req, res) => {
    try {
        console.log(req.files[0])
        const entity = {
            TenNYP: req.body.ten,
            HinhAnh1: req.files[0].filename + req.files[0].originalname.split(".")[1],
            HinhAnh2: req.files[1].filename + req.files[1].originalname.split(".")[1],
            HinhAnh3: req.files[2].filename + req.files[2].originalname.split(".")[1],
            HinhAnh4: req.files[3].filename + req.files[3].originalname.split(".")[1],
            DonGia: req.body.dongia,
            DonViDinhLuong: req.body.donvi,
        };
        const result = await productModel.create(entity);
        if (result.length) {
            res.cookie("createProduct", "Thêm nhu yếu phẩm thành công.");
        } else {
            res.cookie("createProduct", "Thêm nhu yếu phẩm không thành công.");
        }
        res.send(result)
            // return res.redirect("/manager/product/create");
    } catch (error) {
        // return res.redirect("/manager/product/create");
    }
});
module.exports = product;