const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");
const Jwt_refresh_token = require("../models/jwt_refresh_token");
require("dotenv").config();

module.exports = authorize;
function authorize(roles = []) {
  /**
   * middleware to check if the user has access to this route by checking if his role has an access (not by checking his user id)
   * and it adds a user object to the request contains the role (role_name)
   * and the user id
   * and ownsToken (contains refresh token object or false if invalid)
   * OR returns error if Unauthorized or the access token is invalid
   *@param  {Array} roles the roles that has access to the route (empty if everyone has access)
   *
   */
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

      const user = await User.joinRole(decodedToken.userID);

      if (!user || (roles.length && !roles.includes(user.role_name))) {
        // account no longer exists or role not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      req.user = {};
      req.user.role = user.role_name;
      req.user.id = user.userID;
      req.user.ownsToken = await isValidRefreshToken(req.get("refreshToken"));

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
  /**
   * function returns if an object of refresh token data OR false if the token is invalid
   *@param  {String} token Refresh token
   *@return object of refresh token data OR false if the token is invalid
   */
  const refreshToken = await Jwt_refresh_token.findByToken(token);

  if (
    await Jwt_refresh_token.isActive(
      refreshToken.expires_at,
      refreshToken.revoked_at
    )
  )
    return refreshToken;
  else return false;
}
