const payment = require("express").Router();
const paymentModel = require("../../models/manager/payment.model");

payment.get("/list", async (req, res) => {
  var paymentInfo = await paymentModel.listPayment();
  const minimumLimit = parseInt((await paymentModel.getLimit()).HanMuc);

  const PAGE_SIZE = 6;
  const data = [];
  const resultPagination = {};
  var currentPage = 1;
  var totalPage = 1;

  if (req.query.search) {
    paymentInfo = paymentInfo.filter((item) => {
      return (
        item.HoTen.toLowerCase().indexOf(req.query.search.toLowerCase()) >= 0
      );
    });
    return paymentInfo;
  }
  if (paymentInfo) {
    totalPage = Math.ceil(paymentInfo.length / PAGE_SIZE);
  } else {
    msg = "Không tìm thấy dữ liệu";
    return res.render("manager/payment/list", {
      msg: msg,
    });
  }

  if (req.query.page) {
    currentPage = req.query.page;
    for (
      let index = 6 * (req.query.page - 1);
      index < 6 * req.query.page;
      index++
    ) {
      if (paymentInfo[index]) {
        data.push(paymentInfo[index]);
      } else {
        break;
      }
    }
  } else {
    for (let index = 0; index < 6; index++) {
      if (paymentInfo[index]) {
        data.push(paymentInfo[index]);
      } else {
        break;
      }
    }
  }

  paymentInfo.forEach((element) => {
    if (parseInt(element.SoDuNo) < minimumLimit) {
      element.TinhTrang = "Chưa cần thanh toán";
    } else {
      element.TinhTrang = "Đã vượt hạn mức";
    }
  });

  resultPagination.totalPage = totalPage;
  resultPagination.currentPage = currentPage;
  resultPagination.data = data;

  res.render("manager/payment/list", {
    path: "/manager/payment/list",
    payments: resultPagination.data,
    totalPage: resultPagination.totalPage,
    currentPage: resultPagination.currentPage,
    minimumLimit: minimumLimit,
    title: "Quản lý thanh toán",
  });
});



payment.post("/change-limit", async (req, res) => {
  if (req.body.minimumLimit) {
    try {
      const entity = {
        ThoiGianCapNhat: new Date(),
        HanMuc: req.body.minimumLimit,
        NguoiCapNhat: req.session.passport.user.MaTaiKhoan,
      };
      const result = await paymentModel.updateLimit(entity);

      return res.redirect("/manager/payment/list");

      // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    } catch (error) {
      console.log("Error: " + error);
      return res.redirect(`/manager/payment/list`);
    }
  }
  // const limitUpdated = req.body.limit;
});

payment.post("/accept-payment", async (req, res) => {
  const statusUpdated = req.body.limit;
  // const arrayId = [5];
  try {
    const result = await paymentModel.accept(arrayId);
    res.send(result);
    // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
  } catch (error) {
    // return res.redirect(`/manager/user/detail?id=${userUpdated.id}`);
    res.send(error);
  }
});

module.exports = payment;
