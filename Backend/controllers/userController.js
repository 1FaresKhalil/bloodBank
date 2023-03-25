const User = require("../models/user");
const Blood_request = require("../models/blood_request");
const Donation_history = require("../models/donation_history");
const jwt = require("jsonwebtoken");
const userServices = require("../utils/userServices");
const donation_history = require("../models/donation_history");

/*
exports.get = async (req, res, next) => {
  try {
   

    res.status(200).json({ message: "testing purposes only" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};*/

exports.getProfile = async (req, res, next) => {
  try {
    // console.log("gg");
    const user = await userServices.getProfile(req);

    // console.log("user");
    res.status(200).json({ message: "user fetched", user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getbloodRequests = async (req, res, next) => {
  try {
    const blood_requests = await userServices.getbloodRequests(req);

    res
      .status(200)
      .json({ message: "all blood request fetched", blood_requests });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getbloodRequest = async (req, res, next) => {
  try {
    const blood_request = await userServices.getbloodRequest(req);

    res.status(200).json({ message: "blood request fetched", blood_request });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postbloodRequest = async (req, res, next) => {
  try {
    await userServices.postbloodRequest(req);

    res.status(201).json({ message: "blood request created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getdonationHistory = async (req, res, next) => {
  try {
    const donation_history = await userServices.getdonationHistory(req);

    res
      .status(200)
      .json({ message: "donation history fetched", donation_history });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getdonateBlood = async (req, res, next) => {
  try {
    const user = await userServices.getdonateBlood(req);

    res.status(200).json({ message: "user Info fetched", user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postdonateBlood = async (req, res, next) => {
  try {
    await userServices.postdonateBlood(req);

    res.status(201).json({ message: "added to donation history" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.verifyDonation = async (req, res, next) => {
  try {
    await userServices.verifyDonation(req.query.token);

    res.status(200).json({ message: "verified donation successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDonationsSummary = async (req, res, next) => {
  try {
    const donationHistory = await donation_history.fetchAll();

    res
      .status(200)
      .json({ message: "fetched donations Summary", users: donationHistory });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.fetchAll();

    res.status(200).json({ message: "fetched all users", users: users });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
