const accountRoute = require("express").Router();
const accountModel = require("../models/account.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

accountRoute.get("/", (req, res) => {
  if (req.cookies.accessToken) {
    jwt.verify(
      req.cookies.accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, data) => {
        let account = await accountModel.get(data.username);
        if (account) {
          req.session.userInfo = {
            userId: account.MaTaiKhoan,
            username: account.Username,
          };
          return res.render("changePassword", {
            title: "Đổi mật khẩu",
            path: "/change-password",
          });
        } else {
          return res.sendStatus(401);
        }
      }
    );
  } else return res.redirect("/signin");
});

accountRoute.post("/", (req, res) => {
  const reqData = req.body;
  if (reqData.newPass === reqData.retypePass) {
    bcrypt.hash(reqData.newPass, saltRounds, async (err, hashPassword) => {
      if (err) {
        return res.render("changePassword", {
          title: "Đổi mật khẩu",
          path: "/change-password",
          msg: "Mật khẩu không hợp lệ",
        });
      } else {
        const entity = {
          Password: hashPassword,
          TrangThai: 1,
        };
        const username = req.session.userInfo.username;
        const isChange = await accountModel.updatePassword(entity, username);
        if (isChange) {
          res.cookie("paymentSignin", "on", { maxAge: 1000 * 60 * 10 });
          return res.redirect("/payment");
        } else {
          return res.render("changePassword", {
            title: "Đổi mật khẩu",
            path: "/change-password",
            msg: "Mật khẩu không hợp lệ",
          });
        }
      }
    });
  } else
    return res.render("changePassword", {
      title: "Đổi mật khẩu",
      path: "/change-password",
    });
});

module.exports = accountRoute;
