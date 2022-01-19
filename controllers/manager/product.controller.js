const product = require("express").Router();
const cloudinary = require('../../config/cloudinary.config');
const upload = require('../../config/multer.config');
const productModel = require("../../models/manager/product.model");
const csv = require('csv-parser');
const fs = require('fs');

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
        for (let index = 1; index <= ((result.length - result.length % 6) / 6); index++) {
            pagnition.push(index);
        }
        if (result.length % 6 > 0) {
            pagnition.push(((result.length - result.length % 6) / 6) + 1);
        }
        if (req.query.page) {
            for (let index = 6 * (req.query.page - 1); index < 6 * req.query.page; index++) {
                if (result[index]) {
                    resultPagnition.push(result[index]);
                } else {
                    break;
                }

            }
        } else {
            for (let index = 0; index < 6; index++) {
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
        for (let index = 1; index <= ((result.length - result.length % 6) / 6); index++) {
            pagnition.push(index);
        }
        if (result.length % 6 > 0) {
            pagnition.push(((result.length - result.length % 6) / 6) + 1);
        }
        if (req.query.page) {
            for (let index = 6 * (req.query.page - 1); index < 6 * req.query.page; index++) {
                if (result[index]) {
                    resultPagnition.push(result[index]);
                } else {
                    break;
                }

            }
        } else {
            for (let index = 0; index < 6; index++) {
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

product.post("/update", upload.array("image"), async(req, res) => {
    try {
        const uploader = async(path) => await cloudinary.uploads(path, 'Images');
        let fileUpload = [];
        for (const file of req.files) {
            const imageRes = await uploader(file.path);
            fileUpload.push(imageRes.url);
        }
        let images = {};
        let uploadedFile = req.body.uploadedFile.split(',');

        // if (fileUpload.length >= 1) {
        images.HinhAnh1 = fileUpload[0] ? fileUpload[0] : uploadedFile[3];
        images.HinhAnh2 = fileUpload[1] ? fileUpload[1] : uploadedFile[2];
        images.HinhAnh3 = fileUpload[2] ? fileUpload[2] : uploadedFile[1];
        images.HinhAnh4 = fileUpload[3] ? fileUpload[3] : uploadedFile[0];
        // }
        // if (fileUpload.length >= 2) {
        //     images.HinhAnh2 = fileUpload[1];
        // }
        // if (fileUpload.length >= 3) {
        //     images.HinhAnh3 = fileUpload[2];
        // }
        // if (fileUpload.length >= 4) {
        //     images.HinhAnh4 = fileUpload[3];
        // }
        const entity = {
            TenNYP: req.body.TenNYP,
            ...images,
            DonGia: parseInt(req.body.DonGia),
            DonViDinhLuong: req.body.DonViDinhLuong,
        };
        const result = await productModel.update(entity, req.body.id);
        //return res.redirect(`/manager/product/detail?id=${req.body.id}`);
        return res.send(result);
    } catch (error) {
        console.log(error)
            //return res.redirect(`/manager/product/detail?id=${req.body.id}`);
    }
});
product.get("/create", async(req, res) => {
    let message = "";

    return res.render("manager/productCreate", {
        msg: message,
    });
});
product.post("/create", upload.array("image"), async(req, res) => {
    try {
        const uploader = async(path) => await cloudinary.uploads(path, 'Images');
        let fileUpload = [];
        for (const file of req.files) {
            const imageRes = await uploader(file.path);
            fileUpload.push(imageRes.url);
        }
        const entity = {
            TenNYP: req.body.ten,
            HinhAnh1: fileUpload[0],
            HinhAnh2: fileUpload[1],
            HinhAnh3: fileUpload[2],
            HinhAnh4: fileUpload[3],
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
product.post('/upload', upload.single('product'), async (req, res) => {
    try {
        if(req.file) {
            fs.createReadStream(req.file.path)
                .pipe(csv())
                .on('data', async function(data){
                    try {
                        const entity = {
                            TenNYP: data.TenNYP,
                            HinhAnh1: data.HinhAnh1,
                            HinhAnh2: data.HinhAnh2,
                            HinhAnh3: data.HinhAnh3,
                            HinhAnh4: data.HinhAnh4,
                            DonGia: data.DonGia,
                            DonViDinhLuong: data.DonViDinhLuong
                        }
                        const result = await productModel.create(entity);
                    }
                    catch(err) {
                        return res.send('fail');
                    }
                })
                .on('end',function(){                   
                });
            return res.send('success');
        }
    } catch (error) {
        return res.send('fail');
    }
})
module.exports = product;