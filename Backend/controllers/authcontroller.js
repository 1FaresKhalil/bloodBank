const { validationResult } = require("express-validator/check");
const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const userServices = require("../utils/userServices");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if the validation failed an error will be raised
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.data = errors.array();
      // push error messages
      error.data.push({
        messages: errors.array().map((value) => {
          return value.msg;
        }),
      });
      // push old input to not lose it
      error.data.push({
        oldInput: {
          name: req.body.name,
          email: req.body.email,
        },
      });
      throw error;
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User(email, name, hashedPw, null, null, 1);

    await user.save();
    res.status(201).json({ message: "user created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const ipAddress = req.ip;

    const { refreshToken, jwtToken, ...user } = await userServices.authenticate(
      email,
      password,
      ipAddress
    );

    setRefreshToken(res, refreshToken);
    setJwtToken(res, jwtToken);

    res.status(200).json({ message: "user authanticated", user: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.revokeToken = async (req, res, next) => {
  try {
    // accept token from request body or cookie

    const token = req.body.token || req.get("refreshToken");

    const ipAddress = req.ip;

    if (!token) {
      const error = new Error("Token is required");
      error.statusCode = 400;
      throw error;
    }

    // users can revoke their own tokens and admins can revoke any tokens
    if (!req.user.ownsToken && req.user.role !== "Admin") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    await userServices.revokeToken(token, ipAddress);

    res.json({ message: "Token revoked" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.get("refreshToken");
    const ip = req.ip;

    const { refreshToken, jwtToken, ...user } = await userServices.refreshToken(
      token,
      ip
    );

    // if refresh token is changed set it in the cookies
    if (refreshToken !== req.get("refreshToken"))
      setRefreshToken(res, refreshToken);

    setJwtToken(res, jwtToken);

    res.status(200).json({ message: "token changed" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
function setRefreshToken(res, refreshToken) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

function setJwtToken(res, jwtToken) {
  res.cookie("Authorization", jwtToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 15 * 1000,
  });
}
