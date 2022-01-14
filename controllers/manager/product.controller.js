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
        // return res.send(resultPagnition);
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
        return res.send('success');
    } catch (error) {
        return res.send('fail');
    }

});

product.get("/detail", async(req, res) => {

    const MaNYP = req.query.id;
    try {
        const result = await productModel.detail(MaNYP);
        console.log(result)

        if (result) {
            return res.render("manager/product/detail", {
                product: result,
                path: "/manager/product/detail",
            });
        }
        return res.redirect("/manager/product/list");
    } catch (e) {

    }
    // return res.redirect("/manager/product/list");;
});

product.post("/update", async(req, res) => {
    const productUpdated = req.body;
    try {
        const entity = {
            TenNYP: productUpdated.TenNYP,
            HinhAnh1: req.files[0].filename ? req.files[0].filename : productUpdated.HinhAnh1,
            HinhAnh2: req.files[1].filename ? req.files[1].filename : productUpdated.HinhAnh2,
            HinhAnh3: req.files[2].filename ? req.files[2].filename : productUpdated.HinhAnh3,
            HinhAnh4: req.files[3].filename ? req.files[3].filename : productUpdated.HinhAnh4,
            DonGia: productUpdated.DonGia,
            DonViDinhLuong: productUpdated.DonViDinhLuong,
        };
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
        console.log("ngu")
    } catch (e) {
        console.log(e)
        return res.redirect("/manager/product/create");
    }
});
product.post("/update", async(req, res) => {
    const productUpdated = req.body;
    try {
        const entity = {
            TenNYP: productUpdated.ten,
            HinhAnh1: req.files[0].filename,
            HinhAnh2: req.files[1].filename,
            HinhAnh3: req.files[2].filename,
            HinhAnh4: req.files[3].filename,
            DonGia: productUpdated.dongia,
            DonViDinhLuong: productUpdated.donvi,
        };
        const result = await productModel.update(entity, productUpdated.id);
        return res.redirect(`/manager/product/detail?id=${productUpdated.id}`);
    } catch (error) {
        return res.redirect(`/manager/product/detail?id=${productUpdated.id}`);
    }
});
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