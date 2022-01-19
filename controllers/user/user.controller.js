const userRouter = require('express').Router();
const userModel = require('../../models/manager/user.model');
const paymentModel = require('../../models/manager/payment.model');
const user = require("../manager/user.controller");
const jwt = require("jsonwebtoken");

userRouter.get("/profile", async (req, res) => {
  const userId = req.session.passport.user.NguoiLienQuan;
  const username = req.session.passport.user.Username;
  const profileUser = await userModel.get(userId);

  if (!profileUser) {
    return res.render("user/profile", {
      layout: "user",
      path: "/profile",
      title: "Thông tin cá nhân",
    });
  }
  const isolationPlaceInfor = await userModel.place(profileUser.NoiDieuTri);

  profileUser.NoiDieuTri =
    isolationPlaceInfor.TenNoiDTCL + ", " + isolationPlaceInfor.DiaChi;

  return res.render("user/profile", {
    layout: "user",
    profile: profileUser,
    path: "/profile",
    title: "Thông tin cá nhân",
    username: username,
  });
});

userRouter.get("/history-managed", async (req, res) => {
  const userId = req.session.passport.user.NguoiLienQuan;
  const username = req.session.passport.user.Username;
  const historyManaged = await userModel.history(userId);

  for (var i = 0; i < historyManaged.length; i++) {
    const isolationPlaceBefore = await userModel.place(
      historyManaged[i].NoiDTCLTruoc
    );
    isolationPlaceBefore
      ? (historyManaged[i].NoiDTCLTruoc = isolationPlaceBefore.TenNoiDTCL)
      : (historyManaged[i].NoiDTCLTruoc = null);
    if (historyManaged[i].NoiDTCLSau) {
      const isolationPlaceAfter = await userModel.place(
        historyManaged[i].NoiDTCLSau
      );
      isolationPlaceAfter
        ? (historyManaged[i].NoiDTCLSau = isolationPlaceAfter.TenNoiDTCL)
        : (historyManaged[i].NoiDTCLSau = null);
    }
  }

  return res.render("user/historyManaged", {
    history: historyManaged,
    layout: "user",
    path: "/historyManaged",
    username: username,
  });
});

userRouter.get("/history-payment", async (req, res) => {
  const userId = req.session.passport.user.NguoiLienQuan;
  const username = req.session.passport.user.Username;
  const historyPayment = await paymentModel.list(userId);

  return res.render("user/historyPayment", {
    payment: historyPayment,
    layout: "user",
    path: "/historyPayment",
    title: "Lịch sử thanh toán",
    balance: parseInt(historyPayment[historyPayment.length - 1].SoDuNo),
    username: username,
  });
});

userRouter.get("/announce-payment", async (req, res) => {
  const remind = req.cookies.remind;
  const username = req.session.passport.user.Username;
  var announcement = "";

  try {
    if (remind)
      announcement =
        "Hiện tại dư nợ của bạn đang lớn hơn hạn mức cho phép vùi lòng thanh toán";
    else announcement = "Hiện tại không có thông báo nhắc thanh toán nào";

    res.render("user/announcePayment", {
      announce: announcement,
      layout: "user",
      style: "announcePayment",
      title: "Xem thông báo nhắc thanh toán",
      username: username,
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.get("/payment-system", (req, res) => {
  if (req.session) {
    const data = {
      _id: req.session.passport.user.NguoiLienQuan,
      username: req.session.passport.user.Username,
    };
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    res.cookie("accessToken", accessToken, { maxAge: 1000 * 60 * 10 });
    return res.redirect("https://localhost:3005/signin");
  }
});
module.exports = userRouter;