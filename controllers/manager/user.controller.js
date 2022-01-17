const user = require("express").Router();
const { result } = require("../../models/db");
const userModel = require("../../models/manager/user.model");

user.get("/list", async (req, res) => {
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
  const PAGE_SIZE = 8;
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
        return req.query.order === "increase"
          ? item1.Tuoi - item2.Tuoi
          : item2.Tuoi - item1.Tuoi;
      });
    } else if (sort === "status") {
      users = users.sort((item1, item2) => {
        return req.query.order === "increase"
          ? userStatus[item1.TrangThaiHienTai] -
              userStatus[item2.TrangThaiHienTai]
          : userStatus[item2.TrangThaiHienTai] -
              userStatus[item1.TrangThaiHienTai];
      });
    } else if (sort === "id") {
      users = users.sort((item1, item2) => {
        return req.query.order === "increase"
          ? item1.MaNguoiLienQuan - item2.MaNguoiLienQuan
          : item2.MaNguoiLienQuan - item1.MaNguoiLienQuan;
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
      let index = 8 * (req.query.page - 1);
      index < 8 * req.query.page;
      index++
    ) {
      if (users[index]) {
        data.push(users[index]);
      } else {
        break;
      }
    }
  } else {
    for (let index = 0; index < 8; index++) {
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
  res.render("manager/user/list", {
    user: resultPagination.data,
    path: "/manager/user/list",
  });
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