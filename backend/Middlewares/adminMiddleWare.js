const jwt = require("jsonwebtoken");
const User = require("../Model/User");
async function AdminMiddleWare(req, res, next) {
  if (
    req.path == "/login" ||
    req.path == "/signup" ||
    req.path == "/verification" ||
    req.path == "/forgotPassword" ||
    req.path.includes("/resetPassword")
  ) {
    next();
  } else {
    try {
      let token = req.headers["authorization"];

      //if not get token in requests
      if (!token) {
        return res.status(401).json({ message: "unauthorized" });
      } else {
        let decoded = jwt.verify(token, "loginccqq");
        const user = await User.findById(decoded.id);

        if (!user || !decoded.isAdmin) {
          return res.status(401).json({ message: "unauthorized" });
        } else {
          req.user = user;
          next();
        }
      }
    } catch (e) {
      res.json({
        message: "invalid token",
      });
    }
  }
}
module.exports = {
  AdminMiddleWare,
};
