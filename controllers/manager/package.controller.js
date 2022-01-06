const packageRouter = require("express").Router();
const axios = require('axios');
const packageModel = require("../../models/manager/package.model");

packageRouter.get("/list", async(req, res) => {
    let result = await packageModel.list();
    for(let index = 0; index < result.length; index++) {
        const response = await axios.get(`http://localhost:3000/api/package/detail?id=${result[index].MaGoiNYP}`);
        result[index].Amount  = response.data.details.length;
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
    if(req.query.search) {
        result = result.filter(item => {
            return (item.TenGoiNYP.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0);
        })
    }
    if(req.query.sort && req.query.order) {
        
        if(req.query.sort === 'total') {               
            result = result.sort((item1, item2) => { 
                return req.query.order === 'increase' ? item1.Total - item2.Total : item2.Total - item1.Total;
            })
        }

        if(req.query.sort === 'amount') {
            result = result.sort((item1, item2) => {
                return req.query.order === 'increase' ? item1.Amount - item2.Amount : item2.Amount - item1.Amount;
            })
        }
        if(req.query.sort === 'limit') {
            result = result.sort((item1, item2) => {
                return req.query.order === 'increase' ? item1.MucGioiHan - item2.MucGioiHan : item2.MucGioiHan - item1.MucGioiHan ;
            })
        }
        if(req.query.sort === 'time') {
            result = result.sort((item1, item2) => {
                return req.query.order === 'increase' ? item1.ThoiGianGioiHan - item2.ThoiGianGioiHan : item2.ThoiGianGioiHan - item1.ThoiGianGioiHan;
            })
        }           
    }
    if(req.query.start || req.query.end) {
        if(req.query.type === 'total') {
            result = result.filter(item => {
                let status1 = true;
                let status2 = true;
                if(req.query.start) {
                  status1 = item.Total >= req.query.start;
                }
                if(req.query.end) {
                  status2 = item.Total <= req.query.end;
                }
                return status1 && status2;
              })
        }
        if(req.query.type === 'amount') {
            result = result.filter(item => {
                let status1 = true;
                let status2 = true;
                if(req.query.start) {
                  status1 = item.Amount >= req.query.start;
                }
                if(req.query.end) {
                  status2 = item.Amount <= req.query.end;
                }
                return status1 && status2;
              })
        }
        if(req.query.type === 'limit') {
            result = result.filter(item => {
                let status1 = true;
                let status2 = true;
                if(req.query.start) {
                  status1 = item.MucGioiHan >= req.query.start;
                }
                if(req.query.end) {
                  status2 = item.MucGioiHan <= req.query.end;
                }
                return status1 && status2;
              })
        }
        if(req.query.type === 'time') {
            result = result.filter(item => {
                let status1 = true;
                let status2 = true;
                if(req.query.start) {
                  status1 = item.ThoiGianGioiHan >= req.query.start;
                }
                if(req.query.end) {
                  status2 = item.ThoiGianGioiHan <= req.query.end;
                }
                return status1 && status2;
              })
        }
      }

    let pagnition = [];
    for(let index = 1; index <= ((result.length - result.length%8)/8); index++ ) {
        pagnition.push(index);
    }
    if(result.length%8 > 0) {
        pagnition.push(((result.length - result.length%8)/8) + 1);
    }
    if(req.query.page) {
        for(let index = 8*(req.query.page - 1); index < 8*req.query.page; index++){
            if(result[index]) {
                resultPagnition.push(result[index]);
            } else {
                break;
            }
            
        }
    } else {
        for(let index = 0; index < 8; index++) {
            if(result[index]) {
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
packageRouter.get("/delete", async(req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.delete(MaGoiNYP);
        return res.send(result);

        return res.redirect("/manager/package/list");
    } catch (error) {
        return res.redirect("/manager/package/list");
    }
});
packageRouter.get("/detail", async(req, res) => {
    const MaGoiNYP = req.query.id;
    try {
        const result = await packageModel.detail(MaGoiNYP);
        if (result) {
            return res.render("manager/package/detail", {
                package: result,
                path: "/manager/package/detail",
            });
        }
        return res.render("/manager/packageDetail");
    } catch (error) {
        return res.render("/manager/packageDetail");
    }
});
packageRouter.post("/update", async(req, res) => {
    const { package, details } = req.body;
    try {
        const entity = {
            TenGoiNYP: package.TenGoiNYP,
            NgayLapGoi: package.NgayLapGoi,
            MucGioiHan: package.MucGioiHan,
            ThoiGianGioiHan: package.ThoiGianGioiHan,
        };
        const result = packageModel.update(entity, details, package.MaGoiNYP);
        return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
    } catch (error) {
        return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
    }
});
packageRouter.get("/create", (req, res) => {
    let message = "";
    if (req.cookies("createPackage")) {
        message = req.cookies("create");
    }
    return res.render("manager/productCreate", {
        msg: message,
    });
});
packageRouter.post("/create", async(req, res) => {
    const { package, details } = req.body;
    try {
        const result = await packageModel.create(package, details);
        if (result) {
            res.cookie("createPackage", "Thêm gói nhu yếu phẩm thành công.");
        } else {
            res.cookie("createPackage", "Thêm gói nhu yếu phẩm không thành công.");
        }
        return res.redirect("/manager/package/create");
    } catch (error) {
        return res.redirect("/manager/package/create");
    }
});
module.exports = packageRouter;