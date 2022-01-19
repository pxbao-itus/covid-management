const paymentRouter = require("express").Router();
const accountModel = require("../models/account.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

paymentRouter.get("/", async (req, res) => {
  if (req.cookies.accessToken) {
    jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, data) => {
        let account = await accountModel.get(data.username);
        if (account) {
          req.session.userInfor = {
            userId: account.MaTaiKhoan,
            username: account.Username,
          };
        }
        res.cookie("paymentSignin", "on", { maxAge: 1000 * 60 * 5 });

        return res.redirect("/payment");
        // return res.sendStatus(200);
      }
    );
  } else {
    return res.render("signin", {
      path: "/signin",
      title: "Liên kết hệ thống thanh toán",
    });
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
      let account = await accountModel.get(user.Username);
      if (account) {
        req.session.userInfor = {
          userId: account.MaTaiKhoan,
          username: account.Username,
        };
        res.cookie("paymentSignin", "on", { maxAge: 1000 * 60 * 5 });
      } else {
        return res.render("signin", {
          msg: "Tài khoản không tồn tại",
          path: "/signin",
          title: "Liên kết hệ thống thanh toán",
        });
      }
      return res.redirect("./payment");
    });
  })(req, res, next);
});

module.exports = paymentRouter;
