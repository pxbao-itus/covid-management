const packageRouter = require("express").Router();

const packageModel = require("../../models/manager/package.model");

packageRouter.get("/list", async (req, res) => {
  const result = await packageModel.list();

  var options = { day: "2-digit", month: "2-digit", year: "numeric" };
  result.forEach((element) => {
    element.NgayLapGoi = element.NgayLapGoi.toLocaleDateString(
      "en-US",
      options
    );
  });

  return res.render("manager/package/list", {
    packages: result,
    path: req.originalUrl,
  });
});

packageRouter.get("/list/ajax", async (req, res) => {
  try {
    const result = await packageModel.list();

    var options = { day: "2-digit", month: "2-digit", year: "numeric" };
    result.forEach((element) => {
      element.NgayLapGoi = element.NgayLapGoi.toLocaleDateString(
        "en-US",
        options
      );
    });
    
    if (result) {
      return res.send(result);
    } else {
      return res.send([]);
    }
  } catch (error) {
    return res.send([]);
  }
});
packageRouter.get("/delete", async (req, res) => {
  const MaGoiNYP = req.query.id;
  try {
    const result = await packageModel.delete(MaGoiNYP);
    return res.redirect("/manager/package/list");
  } catch (error) {
    return res.redirect("/manager/package/list");
  }
});
packageRouter.get("/detail", async (req, res) => {
  const MaGoiNYP = req.query.id;
  try {
    const result = await packageModel.detail(MaGoiNYP);
    if (result) {
      return res.render("manager/packageDetail", {
        package: result.package,
        details: result.details,
      });
    }
    return res.render("/manager/packageDetail");
  } catch (error) {
    return res.render("/manager/packageDetail");
  }
});
packageRouter.post("/update", async (req, res) => {
  const { package, details } = req.body;
  try {
    const entity = {
      TenGoiNYP: package.TenGoiNYP,
      NgayLapGoi: package.NgayLapGoi,
      MucGioiHan: package.MucGioiHan,
      ThoiGianGioiHan: package.ThoiGianGioiHan,
    };
    const result = packageModel.update(entity, details, package.MaGoiNYP);
    return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
  } catch (error) {
    return res.redirect(`/manager/detail?id=${package.MaGoiNYP}`);
  }
});
packageRouter.get("/create", (req, res) => {
  let message = "";
  if (req.cookies("createPackage")) {
    message = req.cookies("create");
  }
  return res.render("manager/productCreate", {
    msg: message,
  });
});
packageRouter.post("/create", async (req, res) => {
  const { package, details } = req.body;
  try {
    const result = await packageModel.create(package, details);
    if (result) {
      res.cookie("createPackage", "Thêm gói nhu yếu phẩm thành công.");
    } else {
      res.cookie("createPackage", "Thêm gói nhu yếu phẩm không thành công.");
    }
    return res.redirect("/manager/package/create");
  } catch (error) {
    return res.redirect("/manager/package/create");
  }
});
module.exports = packageRouter;
