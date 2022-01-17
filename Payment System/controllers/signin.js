const paymentRouter = require("express").Router();
const accountModel = require("../models/account.model");
const passport = require("passport");

paymentRouter.get("/", async (req, res) => {
  if (req.cookies.paymentSignin !== "on") {
    try {
      res.render("signin.hbs");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect("/payment");
  }
});

paymentRouter.post("/", async (req, res, next) => {
  const title = "Payment System";
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.render("signin", {
        msg: "Tên đăng nhập hoặc mật khẩu không chính xác!",
        title: title,
        path: "/signin",
      });
    }
    if (!user) {
      return res.render("signin", {
        msg: "Tên đăng nhập hoặc mật khẩu không chính xác!",
        title: title,
        path: "/signin",
      });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return res.render("signin", {
          msg: "Tên đăng nhập hoặc mật khẩu không chính xác!",
          title: title,
          path: "/signin",
        });
      }
      res.cookie("paymentUser", user.Username, { signed: true });
      let account = await accountModel.get(user.Username);
      res.cookie("userId", account.MaTaiKhoan, { signed: true });
      res.cookie("paymentSignin", "on");
      return res.redirect("./payment");
    });
  })(req, res, next);
});

module.exports = paymentRouter;
