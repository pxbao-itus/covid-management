const user = require("express").Router();
const userModel = require("../../models/manager/user.model");

user.get("/list", async(req, res) => {
    const users = await userModel.list();

    users.forEach((element) => {
        element.Tuoi = _calculateAge(element.NgaySinh);
    });
    // console.log(users);
    // console.log("-----------------------------------------------");
    res.render("manager/user/list", { user: users, path: "/manager/user/list" });
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
    // const userUpdated = {
    //     id: 1,
    //     trangthaimoi: 'F3',
    //     noidieutri: 1
    // }
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
        const entity = {
            HoTen: req.body.ten,
            CCCD: req.body.cccd,
            SoDienThoai: req.body.sdt,
            NgaySinh: req.body.ngaysinh,
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
        return res.redirect("/manager/user/create");
    }
});

module.exports = user;