const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Jwt_refresh_token = require("../models/jwt_refresh_token");

require("dotenv").config();

module.exports = {
  authenticate,
  refreshToken,
  revokeToken,
};

async function authenticate(email, password, ipAddress) {
  //console.log(email);
  const data = await User.findByEmail(email);

  const user = data[0][0];

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

  const data = await User.findById(decodedToken.userID);

  const user = data[0][0];

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(user, ipAddress);
  const res = await Jwt_refresh_token.revokeToken(
    new Date(),
    ipAddress,
    newRefreshToken.token,
    refreshToken.token
  );

  //await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token,
  };
}

async function revokeToken(token, ipAddress) {
  // revoke token and save
  revoked_at = new Date();
  console.log(revoked_at);
  revoked_by_ip = ipAddress;
  await Jwt_refresh_token.revokeToken(revoked_at, revoked_by_ip, null, token);
}

async function getRefreshToken(token) {
  const data = await Jwt_refresh_token.findByToken(token);
  const refreshToken = data[0][0];

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
  // create a jwt token containing the account id that expires in 15 minutes
  return jwt.sign(
    { userID: user.userID, email: user.email, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
}

function generateRefreshToken(user, ipAddress) {
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
/*
function randomTokenString() {
  return crypto.randomBytes(64).toString("hex");
}*/

function basicDetails(user) {
  const { userId, email, name, password, phone, last_login, created_at, role } =
    user;
  return {
    name,
    email,
    role,
  };
}
