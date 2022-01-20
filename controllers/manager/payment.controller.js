const payment = require("express").Router();
const paymentModel = require("../../models/manager/payment.model");

payment.get("/list", (req, res) => {
  res.render("manager/payment/list", {
    path: "/manager/payment/list",
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
