const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const Jwt_refresh_token = require("../models/jwt_refresh_token");
require("dotenv").config();

module.exports = authorize;
function authorize(roles = []) {
  return async (req, res, next) => {
    try {
      const decodedToken = await jwt.verify(
        req.get("Authorization"),
        process.env.ACCESS_TOKEN_SECRET,

        function (err, decoded) {
          if (err) {
            const error = new Error("Invalid Token!");
            error.statusCode = 401;
            throw error;
          }
          return decoded;
        }
      );

      const userdata = await User.findById(decodedToken.userID);
      const user = userdata[0][0];

      const roledata = await Role.findById(user.role);
      const role = roledata[0][0];

      if (!user || (roles.length && !roles.includes(role.role_name))) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      req.user = {};
      req.user.role = role.role_name;

      //const refreshTokens = await isValidRefreshToken(req.get("refreshToken"));

      req.user.ownsToken = async (refreshTokens) =>
        await isValidRefreshToken(req.get("refreshToken"));

      next();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
}

async function isValidRefreshToken(token) {
  const data = await Jwt_refresh_token.findByToken(token);
  const refreshToken = data[0][0];

  return (
    refreshToken ||
    Jwt_refresh_token.isActive(refreshToken.expires_at, refreshToken.revoked_at)
  );
}
