const userRouter = require('express').Router();
const userModel = require('../../models/manager/user.model');
const paymentModel = require('../../models/manager/payment.model');



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

userRouter.get('/payment',(req,res)=>{

    res.send(process.env.PORT);
});

module.exports = userRouter;