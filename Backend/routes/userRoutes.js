const express = require("express");

const userController = require("../controllers/userController");

const router = express.Router();
const authorize = require("../middleware/authorize");

//router.get("/", authorize(), userController.getProfile);
router.get("/profile/:userID", authorize(), userController.getProfile);

router.get("/blood-requests", userController.getbloodRequests);

router.get("/blood-request/:bloodRequestID", userController.getbloodRequest);
router.post("/blood-request", userController.postbloodRequest);

router.get("/donationHistory", authorize(), userController.getdonationHistory);

module.exports = router;
