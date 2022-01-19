const paymentRouter = require("express").Router();
const paymentModel = require("../models/payment.model");
const accountPaymentModel = require("../models/account.model");

paymentRouter.get("/", async (req, res) => {
  if (req.cookies.paymentSignin !== "on") {
    try {
      return res.redirect("/signin");
    } catch (error) {
      console.log("Error : " + error);
    }
  } else {
    const userInfo = req.session.userInfo;
    const paymentLoan = await paymentModel.getLoan(userInfo.userId);
    const accountPayment = await accountPaymentModel.getBalance(
      userInfo.userId
    );
    const balance = parseInt(accountPayment.SoDu);
    const loan = parseInt(paymentLoan.SoDuNo);
    var username = userInfo.username;
    return res.render("paymentLoan", {
      data: { loan: loan, balance: balance },
      username: username,
    });
  }
});

paymentRouter.post("/", async (req, res) => {
  const userInfo = req.session.userInfo;
  if (req.cookies.paymentSignin !== "on") {
    return res.redirect("/payment/signin");
  } else {
    const paymentLoan = await paymentModel.getLoan(userInfo.userId);
    const accountPayment = await accountPaymentModel.getBalance(
      userInfo.userId
    );
    var balance = parseInt(accountPayment.SoDu);
    var loan = parseInt(paymentLoan.SoDuNo);
    const money = parseInt(req.body.money);
    const userId = userInfo.userId;
    const username = userInfo.username;
    var today = new Date();
    const entity = {
      NguoiLienQuan: userId,
      ThoiGian: today,
      SoTien: money,
    };
    try {
      const result = await paymentModel.create(entity, username);
      var msg = "";
      if (result) {
        balance -= result.SoTien;
        loan -= result.SoTien;
        msg = "Thanh toán thành công";
        return res.render("paymentLoan", {
          msg: msg,
          data: { paymentLoan: true, loan: loan, balance: balance },
        });
      } else {
        msg = "Thanh toán thất bại";
        return res.render("paymentLoan", {
          error: msg,
          data: { paymentLoan: true, loan: loan, balance: balance },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

paymentRouter.get("/signout", async (req, res) => {
  res.clearCookie("paymentSignin");
  res.clearCookie("accessToken");
  req.session.destroy();
  return res.redirect("/");
});

paymentRouter.get("/input-money", async (req, res) => {
  if (req.cookies.paymentSignin !== "on") {
    return res.redirect("/signin");
  } else {
    return res.render("inputMoney", {
      data: { inputMoney: true },
      username: req.session.userInfo.username,
    });
  }
});

paymentRouter.post("/input-money", async (req, res) => {
  if (req.cookies.paymentSignin !== "on") {
    return res.redirect("/payment/signin");
  } else {
    const paymentInserted = req.body;
    const userInfo = req.session.userInfo;
    const entity = {
      SoDu: paymentInserted.money,
    };
    try {
      const result = await paymentModel.recharge(entity, userInfo.userId);
      if (result) {
        res.render("inputMoney", {
          username: userInfo.username,
          data: { inputMoney: true },
          msg: "Nạp tiền thành công",
        });
      } else {
        res.render("inputMoney", {
          username: userInfo.username,
          data: { inputMoney: true },
          error: "Nạp tiền không thành công",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = paymentRouter;
