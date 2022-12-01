const express = require("express");
const { body } = require("express-validator/check");

const User = require("../models/user");
const authController = require("../controllers/authcontroller");
const authorize = require("../middleware/authorize");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value, { req }) => {
        const userDoc = await User.findByEmail(value);
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
          //throw new Error("E-Mail address already exists!");
        }
        return true;
      })
      .normalizeEmail(),

    body("name", "Please enter a valid name.")
      .trim()
      .not()
      .isEmpty()
      .withMessage("name cannot be empty."),

    body("password", "Please enter a valid password.")
      .isLength({ min: 5 })
      .withMessage("Password minumum length is 5 letters.")
      .isAlphanumeric()
      .withMessage("password must be Alphanumeric"),

    body("confirmPassword", "invalid confirm Password").custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject("Passwords have to match!");
          //throw new Error("Passwords have to match!");
        }
        return true;
      }
    ),
  ],
  authController.signup
);

router.post("/signin", authController.signin);

router.post("/refresh-token", authController.refreshToken);

router.post("/revoke-token", authorize(), authController.revokeToken);

router.get("/verify-email", authController.verifyEmail);

module.exports = router;
