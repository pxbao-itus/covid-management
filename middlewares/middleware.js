const authController = async (req, res, next) => {
  try {
    if (
      req.originalUrl.indexOf("auth") >= 0 ||
      req.originalUrl.indexOf("init") >= 0
    ) {
      return next();
    }
    if (req.user) {
      if (
        req.user.role === "MANAGER" &&
        req.originalUrl.indexOf("manager") >= 0 &&
        req.originalUrl.indexOf("admin") < 0
      ) {
        return next();
      }
      if (req.user.role === "ADMIN" && req.originalUrl.indexOf("admin") >= 0) {
        return next();
      }
      if (
        req.user.role === "USER" &&
        req.originalUrl.indexOf("manager") < 0 &&
        req.originalUrl.indexOf("admin") < 0
      ) {
        return next();
      }
      switch (req.user.role) {
        case "USER":
          return res.redirect("/user/profile");
        case "MANAGER":
          return res.redirect("/manager/user/list");
        case "ADMIN":
          return res.redirect("/admin/manager/list");
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect("/auth/signout");
  }
  return res.redirect('/auth/signout')
}
module.exports = authController;