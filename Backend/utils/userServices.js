const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Jwt_refresh_token = require("../models/jwt_refresh_token");

module.exports = {
  authenticate,
  refreshToken,
  revokeToken,
};

async function authenticate(email, password, ipAddress) {
  /**
   * Function to authenticate a user for login
   * @param    {String} email  email of the user
   * @param    {String} password  password of the user
   * @param    {String} ipAddress  ip of the user
   * @return   {Object}          ...basicDetails(user) results, jwt Access Token, jwt refresh Token
   */
  const user = await User.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Wrong email or password!");
    error.statusCode = 401;
    throw error;
  }
  await User.loginById(user.userID);

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user, ipAddress);

  // save refresh token
  await refreshToken.save();

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: refreshToken.token,
  };
}

async function refreshToken(token, ipAddress) {
  /**
   * Function to create a new Access token and
   * RefreshToken before 1 day of expiry date
   * @param    {String} token  Refresh token
   * @param    {String} ipAddress  ip of the user
   * @return   {Object}          ...basicDetails(user) results,
   * the new jwt Access Token,
   * the new new jwt refresh Token if created or the old one if not created
   */

  const refreshToken = await getRefreshToken(token);

  const decodedToken = await jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err) {
        const error = new Error("Invalid Token!");
        error.statusCode = 401;

        throw error;
      }
      return decoded;
    }
  );

  const user = await User.findById(decodedToken.userID);

  // generate a new refreshToken if there is 1 day left for expiry date
  if ((refreshToken.expires_at - Date.now()) / (1000 * 60 * 60 * 24) < 1) {
    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user, ipAddress);

    await Jwt_refresh_token.revokeToken(
      new Date(),
      ipAddress,
      newRefreshToken.token,
      refreshToken.token
    );

    await newRefreshToken.save();
    token = newRefreshToken.token;
  }
  // generate new jwt Access token
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    // the new refresh token if replaced or the old one
    refreshToken: token,
  };
}

async function revokeToken(token, ipAddress) {
  /**
   * Function to revoke the refresh token
   * @param    {String} token  Refresh token
   * @param    {String} ipAddress  ip of the user
   */

  // revoke token and save
  revoked_at = new Date();
  revoked_by_ip = ipAddress;
  await Jwt_refresh_token.revokeToken(revoked_at, revoked_by_ip, null, token);
}

async function getRefreshToken(token) {
  /**
   * Function to get the refresh token from database
   * @param    {String} token  Refresh token
   * @return   {Object}       returns the token data or an error if it's invalid
   */
  const refreshToken = await Jwt_refresh_token.findByToken(token);

  if (
    !refreshToken ||
    !Jwt_refresh_token.isActive(
      refreshToken.expires_at,
      refreshToken.revoked_at
    )
  ) {
    const error = new Error("Invalid Token!");
    error.statusCode = 401;

    throw error;
  }
  return refreshToken;
}

function generateJwtToken(user) {
  /**
   * Function to generate the access token
   * @param    {Object} user  Refresh token
   * @return   {string} jwt access token
   */

  // create a jwt token containing the user id, email, name that expires in 15 minutes
  return jwt.sign(
    { userID: user.userID, email: user.email, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

function generateRefreshToken(user, ipAddress) {
  /**
   * Function to generate the refresh token
   * @param    {Object} user  Refresh token
   * @param    {String} ipAddress user's ip address
   * @return    {Object} object of Jwt_refresh_token with
   * refresh token, expiry date and ip address
   */

  // create a refresh token that expires in 7 days
  refreshToken = jwt.sign(
    { userID: user.userID, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return new Jwt_refresh_token(
    refreshToken,
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ipAddress
  );
}

function basicDetails(user) {
  /**
   * Function to generate the refresh token
   * @param    {Object} user  Refresh token
   * @return    {Object} name, email and role of the user
   *
   */
  const { userId, email, name, password, phone, last_login, created_at, role } =
    user;
  return {
    name,
    email,
    role,
  };
}

/*
function randomTokenString() {
  return crypto.randomBytes(64).toString("hex");
}*/
