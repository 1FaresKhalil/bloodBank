const express = require("express");

const authController = require("../controllers/authcontroller");

const router = express.Router();

router.post("/signup", authController.signup);
router.put("/signin", authController.signin);

module.exports = router;
