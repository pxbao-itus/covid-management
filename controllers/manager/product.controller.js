const product = require("express").Router();
var upload = require('../../config/upload.config');

const productModel = require("../../models/manager/product.model");

product.get("/list", async(req, res) => {
    const products = await productModel.list();
    return res.render("./manager/product/list", {
        products: products,
        path: req.originalUrl,
    });
});
product.get("/list/ajax", async(req, res) => {
    const products = await productModel.list();
    return res.send(products);
});
product.get("/delete", async(req, res) => {
    const MaNYP = req.query.id;
    const result = await productModel.delete(MaNYP);
    return res.redirect("/manager/product/list");
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
    } catch (error) {
        return res.redirect("/manager/product/list");
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