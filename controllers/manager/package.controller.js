const packageRouter = require("express").Router();
const axios = require('axios');
const packageModel = require("../../models/manager/package.model");
const cloudinary = require('../../config/cloudinary.config');
const upload = require('../../config/multer.config');
const DatauriParser = require('datauri/parser');
const path = require('path');
const parser = new DatauriParser();

packageRouter.get("/list", async(req, res) => {
    try {
        let result = await packageModel.list();
        for (let index = 0; index < result.length; index++) {
            const response = await axios.get(`http://localhost:3000/api/package/detail?id=${result[index].MaGoiNYP}`);
            result[index].Amount = response.data.details.length;
            result[index].Total = response.data.details.reduce((item1, item2) => {
                return item1 + item2.DonGia * item2.SoLuong;
            }, 0);
        }
        let resultPagnition = [];
        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        result.forEach((element) => {
            element.NgayLapGoi = element.NgayLapGoi.toLocaleDateString(
                "vi-VN",
                options
            );
        });
        if (req.query.search) {
            result = result.filter(item => {
                return (item.TenGoiNYP.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0);
            })
        }
        if (req.query.sort && req.query.order) {

            if (req.query.sort === 'total') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.Total - item2.Total : item2.Total - item1.Total;
                })
            }

            if (req.query.sort === 'amount') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.Amount - item2.Amount : item2.Amount - item1.Amount;
                })
            }
            if (req.query.sort === 'limit') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.MucGioiHan - item2.MucGioiHan : item2.MucGioiHan - item1.MucGioiHan;
                })
            }
            if (req.query.sort === 'time') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.ThoiGianGioiHan - item2.ThoiGianGioiHan : item2.ThoiGianGioiHan - item1.ThoiGianGioiHan;
                })
            }
        }
        if (req.query.start || req.query.end) {
            if (req.query.type === "total") {
                result = result.filter((item) => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.Total >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.Total <= req.query.end;
                    }
                    return status1 && status2;
                });
            }
            if (req.query.type === "amount") {
                result = result.filter((item) => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.Amount >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.Amount <= req.query.end;
                    }
                    return status1 && status2;
                });
            }
            if (req.query.type === "limit") {
                result = result.filter((item) => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.MucGioiHan >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.MucGioiHan <= req.query.end;
                    }
                    return status1 && status2;
                });
            }
            if (req.query.type === "time") {
                result = result.filter((item) => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.ThoiGianGioiHan >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.ThoiGianGioiHan <= req.query.end;
                    }
                    return status1 && status2;
                });
            }
        }
        if (req.query.page) {
            for (
                let index = 6 * (req.query.page - 1); index < 6 * req.query.page; index++
            ) {
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

        return res.render("manager/package/list", {
            packages: resultPagnition,
            path: req.originalUrl,
        });

    } catch (error) {
        return res.render("manager/package/list", {
            packages: [],
            path: req.originalUrl,
        });
    }


});

packageRouter.post("/list", async(req, res) => {
    try {
        let result = await packageModel.list();
        for (let index = 0; index < result.length; index++) {
            const response = await axios.get(`http://localhost:3000/api/package/detail?id=${result[index].MaGoiNYP}`);
            result[index].Amount = response.data.details.length;
            result[index].Total = response.data.details.reduce((item1, item2) => {
                return item1 + item2.DonGia * item2.SoLuong;
            }, 0);
        }

        let resultPagnition = [];
        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        result.forEach((element) => {
            element.NgayLapGoi = element.NgayLapGoi.toLocaleDateString(
                "vi-VN",
                options
            );
        });

        if (req.query.search) {
            result = result.filter(item => {
                return (item.TenGoiNYP.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0);
            })
        }
        if (req.query.sort && req.query.order) {

            if (req.query.sort === 'total') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.Total - item2.Total : item2.Total - item1.Total;
                })
            }

            if (req.query.sort === 'amount') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.Amount - item2.Amount : item2.Amount - item1.Amount;
                })
            }
            if (req.query.sort === 'limit') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.MucGioiHan - item2.MucGioiHan : item2.MucGioiHan - item1.MucGioiHan;
                })
            }
            if (req.query.sort === 'time') {
                result = result.sort((item1, item2) => {
                    return req.query.order === 'increase' ? item1.ThoiGianGioiHan - item2.ThoiGianGioiHan : item2.ThoiGianGioiHan - item1.ThoiGianGioiHan;
                })
            }
        }

        if (req.query.start || req.query.end) {
            if (req.query.type === 'total') {
                result = result.filter(item => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.Total >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.Total <= req.query.end;
                    }
                    return status1 && status2;
                })
            }
            if (req.query.type === 'amount') {
                result = result.filter(item => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.Amount >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.Amount <= req.query.end;
                    }
                    return status1 && status2;
                })
            }
            if (req.query.type === 'limit') {
                result = result.filter(item => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.MucGioiHan >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.MucGioiHan <= req.query.end;
                    }
                    return status1 && status2;
                })
            }
            if (req.query.type === 'time') {
                result = result.filter(item => {
                    let status1 = true;
                    let status2 = true;
                    if (req.query.start) {
                        status1 = item.ThoiGianGioiHan >= req.query.start;
                    }
                    if (req.query.end) {
                        status2 = item.ThoiGianGioiHan <= req.query.end;
                    }
                    return status1 && status2;
                })
            }
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

        return res.render("manager/package/list", {
            packages: resultPagnition,
            path: req.originalUrl,
        });

    } catch (error) {
        return res.render("manager/package/list", {
            packages: [],
            path: req.originalUrl,
        });
    }


});

packageRouter.get("/list/ajax", async(req, res) => {
    try {
        const result = await packageModel.list();

        var options = { day: "2-digit", month: "2-digit", year: "numeric" };
        result.forEach((element) => {
            element.NgayLapGoi = element.NgayLapGoi.toLocaleDateString(
                "vi-VN",
                options
            );
        });

        if (result) {
            return res.send(result);
        } else {
            return res.send([]);
        }
    } catch (error) {
        return res.send([]);
    }
});
packageRouter.post("/delete", async(req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.delete(MaGoiNYP);
        return res.send('success');
    } catch (error) {
        return res.send('fail');
    }
});
packageRouter.get("/detail", async(req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.detail(MaGoiNYP);
        if (result) {
            result.details2 = JSON.stringify(result.details)
            return res.render("manager/package/detail", {
                package: result,
                path: "/manager/package/detail",
            });
        }
        return res.redirect("/manager/package/list");
    } catch (error) {
        return res.render("/manager/package/list");
    }
});

packageRouter.post("/update", upload.single('image'), async(req, res) => {
    let { package, details, oldman } = req.body;
    package = JSON.parse(package);
    details = JSON.parse(details);
    oldman = JSON.parse(oldman);
    try {
        const uploader = async(path) => await cloudinary.uploads(path, 'Images');
        const formatBufferTo64 = file =>
            parser.format(path.extname(file.originalname).toString(), file.buffer);

        let image = {};
        if (req.file) {
            const file64 = formatBufferTo64(req.file);
            const imageRes = await uploader(file64.content);
            image.HinhAnh = imageRes.url;
        }
        const packageFull = {
            TenGoiNYP: package.TenGoiNYP,
            NgayLapGoi: package.NgayLapGoi,
            MucGioiHan: package.MucGioiHan,
            ThoiGianGioiHan: package.ThoiGianGioiHan,
            ...image
        };

        const result = packageModel.update(packageFull, details, oldman, package.MaGoiNYP);
        return res.send('ok');
    } catch (error) {
        // return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
    }
});
packageRouter.get("/create", (req, res) => {
    let message = "";
    if (req.cookies["createPackage"]) {
        message = req.cookies["create"];
    }
    return res.render("manager/productCreate", {
        msg: message,
    });
});
packageRouter.post("/create", upload.single('image'), async(req, res) => {
    let { package, details } = req.body;
    package = JSON.parse(package);
    details = JSON.parse(details);
    try {
        const uploader = async(path) => await cloudinary.uploads(path, 'Images');
        const formatBufferTo64 = file =>
            parser.format(path.extname(file.originalname).toString(), file.buffer);
        const file64 = formatBufferTo64(req.file);
        const imageRes = await uploader(file64.content);
        const packageFull = {
            ...package,
            HinhAnh: imageRes.url
        };
        // console.log(packageFull)
        // console.log(details)
        const result = await packageModel.create(packageFull, details);

        return res.redirect("/manager/package/create");
    } catch (error) {
        return res.redirect("/manager/package/create");
    }
});
module.exports = packageRouter;