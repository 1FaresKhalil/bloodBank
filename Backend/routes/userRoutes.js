const express = require("express");
const { body } = require("express-validator/check");

const userController = require("../controllers/userController");

const authorize = require("../middleware/authorize");

const router = express.Router();

//router.get("/", /*authorize(),*/ userController.get);
router.get("/profile/:userID", authorize(), userController.getProfile);

router.get("/blood-requests", userController.getbloodRequests);

router.get("/blood-request/:bloodRequestID", userController.getbloodRequest);

router.post(
  "/blood-request",
  authorize(),
  [
    body("blood_type", "Please enter a valid bloodType.")
      .trim()
      .not()
      .isEmpty()
      .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .withMessage("city cannot be empty."),
    body("city", "Please enter a valid city.")
      .trim()
      .not()
      .isEmpty()
      .withMessage("city cannot be empty."),

    body("location", "Please enter a valid location.")
      .trim()
      .not()
      .isEmpty()
      .withMessage("location cannot be empty."),
  ],
  userController.postbloodRequest
);

router.post(
  "/donateBlood/:bloodRequestID",
  authorize(),
  userController.postdonateBlood
);

router.get("/donateBlood", authorize(), userController.getdonateBlood);

router.get("/verify-donation", userController.verifyDonation);

router.get("/donationHistory", authorize(), userController.getdonationHistory);

router.get(
  "/donationsSummary",
  authorize(["admin"]),
  userController.getDonationsSummary
);

module.exports = router;
