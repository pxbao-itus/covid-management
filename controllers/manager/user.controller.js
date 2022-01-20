const user = require("express").Router();
const { result } = require("../../models/db");
const userModel = require("../../models/manager/user.model");
const upload = require('../../config/multer.config');
const fs = require('fs');
const csv = require('csv-parser');

user.get("/list", async(req, res) => {
    var users = await userModel.list();

    const userStatus = {
        KhoiBenh: 0,
        BinhThuong: 1,
        F3: 2,
        F2: 3,
        F1: 4,
        F0: 5,
        TuVong: 6,
    };
    const PAGE_SIZE = 6;
    const data = [];
    const resultPagination = {};
    var currentPage = 1;
    var totalPage = 1;

    users.forEach((element) => {
        element.Tuoi = _calculateAge(element.NgaySinh);
    });
    if (req.query.search) {
        users = users.filter((item) => {
            return (
                item.HoTen.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0
            );
        });
        return users;
    }

    if (req.query.sort) {
        const sort = req.query.sort;
        if (sort === "age") {
            users = users.sort((item1, item2) => {
                return req.query.order === "increase" ?
                    item1.Tuoi - item2.Tuoi :
                    item2.Tuoi - item1.Tuoi;
            });
        } else if (sort === "status") {
            users = users.sort((item1, item2) => {
                return req.query.order === "increase" ?
                    userStatus[item1.TrangThaiHienTai] -
                    userStatus[item2.TrangThaiHienTai] :
                    userStatus[item2.TrangThaiHienTai] -
                    userStatus[item1.TrangThaiHienTai];
            });
        } else if (sort === "id") {
            users = users.sort((item1, item2) => {
                return req.query.order === "increase" ?
                    item1.MaNguoiLienQuan - item2.MaNguoiLienQuan :
                    item2.MaNguoiLienQuan - item1.MaNguoiLienQuan;
            });
        }
    }

    if (users) {
        totalPage = Math.ceil(users.length / PAGE_SIZE);
    } else {
        msg = "Không tìm thấy dữ liệu";
        res.render("manager/user/list", {
            msg: msg,
        });
    }

    if (req.query.page) {
        currentPage = req.query.page;
        for (
            let index = 6 * (req.query.page - 1); index < 6 * req.query.page; index++
        ) {
            if (users[index]) {
                data.push(users[index]);
            } else {
                break;
            }
        }
    } else {
        for (let index = 0; index < 6; index++) {
            if (users[index]) {
                data.push(users[index]);
            } else {
                break;
            }
        }
    }

    resultPagination.totalPage = totalPage;
    resultPagination.currentPage = currentPage;
    resultPagination.data = data;

    // console.log(users);
    // console.log("-----------------------------------------------");
    return res.render("manager/user/list", {
        user: resultPagination.data,
        total: totalPage,
        currentPage: currentPage,
        path: "/manager/user/list",
    });
});
user.post("/list", async(req, res) => {
    var users = await userModel.list();

    const userStatus = {
        KhoiBenh: 0,
        BinhThuong: 1,
        F3: 2,
        F2: 3,
        F1: 4,
        F0: 5,
        TuVong: 6,
    };
    const PAGE_SIZE = 6;
    const data = [];
    const resultPagination = {};
    var currentPage = 1;
    var totalPage = 1;

    users.forEach((element) => {
        element.Tuoi = _calculateAge(element.NgaySinh);
    });
    if (req.query.search) {
        users = users.filter((item) => {
            return (
                item.HoTen.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0
            );
        });
    }

    if (req.query.sort) {
        const sort = req.query.sort;
        if (sort === "age") {
            users = users.sort((item1, item2) => {
                return req.query.order === "increase" ?
                    item1.Tuoi - item2.Tuoi :
                    item2.Tuoi - item1.Tuoi;
            });
        } else if (sort === "status") {
            users = users.sort((item1, item2) => {
                return req.query.order === "increase" ?
                    userStatus[item1.TrangThaiHienTai] -
                    userStatus[item2.TrangThaiHienTai] :
                    userStatus[item2.TrangThaiHienTai] -
                    userStatus[item1.TrangThaiHienTai];
            });
        } else if (sort === "id") {
            users = users.sort((item1, item2) => {
                return req.query.order === "increase" ?
                    item1.MaNguoiLienQuan - item2.MaNguoiLienQuan :
                    item2.MaNguoiLienQuan - item1.MaNguoiLienQuan;
            });
        }
    }

    if (users) {
        totalPage = Math.ceil(users.length / PAGE_SIZE);
    } else {
        msg = "Không tìm thấy dữ liệu";
        res.render("manager/user/list", {
            msg: msg,
        });
    }

    if (req.query.page) {
        currentPage = req.query.page;
        for (
            let index = 6 * (req.query.page - 1); index < 6 * req.query.page; index++
        ) {
            if (users[index]) {
                data.push(users[index]);
            } else {
                break;
            }
        }
    } else {
        for (let index = 0; index < 6; index++) {
            if (users[index]) {
                data.push(users[index]);
            } else {
                break;
            }
        }
    }

    resultPagination.totalPage = totalPage;
    resultPagination.currentPage = currentPage;
    resultPagination.data = data;

    // console.log(users);
    // console.log("-----------------------------------------------");
    res.send({
        totalPage: resultPagination.totalPage,
        resultPagnition: resultPagination.data,
        currentPage: currentPage,
    });

    // res.render("manager/user/list", {
    //     user: resultPagination.data,
    //     total: totalPage,
    //     currentPage: currentPage,
    //     path: "/manager/user/list",
    // });
});

function _calculateAge(birthday) {
    // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
user.get("/list/ajax", async(req, res) => {
    const users = await userModel.list();

    users.forEach((element) => {
        element.Tuoi = _calculateAge(element.NgaySinh);
    });

    res.send(users);
});

user.get("/detail", async(req, res) => {

    const MaNLQ = req.query.id;
    const detailInfo = await userModel.detail(MaNLQ);

    var options = { day: "2-digit", month: "2-digit", year: "numeric" };
    detailInfo.detail.NgaySinh = detailInfo.detail.NgaySinh.toLocaleDateString(
        "vi-VN",
        options
    );

    res.render("manager/user/detail", {
        userDetail: detailInfo.detail,
        relatedUsers: detailInfo.DSNguoiLienDoi,
        path: "/manager/user/detail",
    });
});

user.post("/update", async(req, res) => {
    const userUpdated = req.body;
    try {
        const entity = {
            TrangThaiHienTai: userUpdated.trangthaimoi,
            NoiDieuTri: userUpdated.noidieutrimoi,
        };
        const result = await userModel.update(entity, userUpdated.id);
        return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    } catch (error) {
        return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    }
});

user.get("/create", async(req, res) => {
    if (req.cookies("createUser")) {
        message = req.cookies("create");
    }
    return res.render("manager/userCreate", {
        msg: message,
    });
});

user.post("/create", async(req, res) => {
    res.clearCookie("createUser");
    try {
        var dob = "";
        if (req.body.ngaysinh) {
            dob = req.body.ngaysinh.split("-").reverse().join("-");
        }

        const entity = {
            HoTen: req.body.ten,
            CCCD: req.body.cccd,
            SoDienThoai: req.body.sdt,
            NgaySinh: dob,
            DiaChi: req.body.diachi,
            TrangThaiHienTai: req.body.trangthaihientai,
            NoiDieuTri: req.body.noidieutri,
        };

        const result = await userModel.create(entity);
        if (result) {
            res.cookie("createUser", "Thêm người liên quan covid thành công.");
        } else {
            res.cookie("createUser", "Thêm người liên quan covid không thành công.");
        }

        res.send(result);

    } catch (error) {
        console.log("Error: " + error);
        return res.redirect("/manager/user/list");
    }
});
user.post("/relation", async(req, res) => {
    res.clearCookie("createUser");
    console.log(req.body)

    try {
        var dob = "";
        if (req.body.ngaysinh) {
            dob = req.body.ngaysinh.split("-").reverse().join("-");
        }

        const entity = {
            HoTen: req.body.ten,
            CCCD: req.body.cccd, // eh m
            SoDienThoai: req.body.sdt,
            NgaySinh: dob,
            DiaChi: req.body.diachi,
            TrangThaiHienTai: req.body.trangthaihientai,
            NoiDieuTri: req.body.noidieutri,
        };
        console.log(entity)

        const result = await userModel.create(entity);
        const result1 = await userModel.addRelation({ NguoiLienQuan1: result.MaNguoiLienQuan, NguoiLienQuan2: req.body.MaNguoiLienQuan });
        if (result) {
            res.cookie("createUser", "Thêm người liên quan covid thành công.");
        } else {
            res.cookie("createUser", "Thêm người liên quan covid không thành công.");
        }

        console.log(result);

    } catch (error) {
        return res.send('fuck');

    }
});

user.post("/upload", upload.single('file'), async(req, res) => {
    if (req.file) {
        const users = req.file.buffer.toLocaleString().split(`\r\n`);
        users.pop();
        for (const item of users) {
            const itemSplit = item.split(',');
            const entity = {
                HoTen: itemSplit.shift(),
                CCCD: itemSplit.shift(),
                NgaySinh: itemSplit.shift(),
                SoDienThoai: itemSplit.shift(),
                TrangThaiHienTai: itemSplit.shift(),
                NoiDieuTri: itemSplit.shift(),
                DiaChi: itemSplit.join(', ').replace(/"/g,''),
            };
            const result = await userModel.create(entity);
        }           
        return res.render('admin/treatment/create', {
            layout: 'adminSidebar',
            title: 'Thêm mới người liên quan',
            path: 'createTreatment',
            msg: 'Thêm người liên quan thành công!',
            status: 1
        });
    }

});


module.exports = user;