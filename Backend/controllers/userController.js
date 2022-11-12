const User = require("../models/user");
const Blood_request = require("../models/blood_request");
const Donation_history = require("../models/donation_history");
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res, next) => {
  try {
    checkUser(req.user.role, req.user.id, req.params.userID);

    const user = await User.findById(req.user.id);

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
    await verifyAccessToken(req.get("Authorization"));

    const blood_requests = await Blood_request.fetchActive();
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
    await verifyAccessToken(req.get("Authorization"));

    const blood_request = await Blood_request.findById(
      req.params.bloodRequestID
    );
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
    const decodedToken = await verifyAccessToken(req.get("Authorization"));

    const requesterID = decodedToken.userID;
    const location = req.body.location;
    const city = req.body.city;
    const blood_request = new Blood_request(requesterID, city, location);
    await blood_request.save();
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
    checkUser(req.user.role, req.user.id, req.params.userID);
    const user = req.params.userID;

    const donation_history = await Donation_history.findByUser(user.userID);

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
    const decodedToken = await verifyAccessToken(req.get("Authorization"));
    const user = await User.findById(decodedToken.userID);

    const userInfo = {
      name: user.name,
      city: user.city,
      phone: user.phone,
      blood_type: user.blood_type,
    };

    res.status(200).json({ message: "user Info fetched", userInfo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postdonateBlood = async (req, res, next) => {
  try {
    const blood_type = req.body.bloodType;
    const city = req.body.city;
    const name = req.body.name;
    const phone = req.body.phone;

    const decodedToken = await verifyAccessToken(req.get("Authorization"));
    const userID = decodedToken.userID;

    await User.updateInfoById(name, city, phone, blood_type, userID);

    const donation_history = new Donation_history(
      req.params.bloodRequestID,
      userID
    );
    await donation_history.save();

    res.status(201).json({ message: "added to donation history" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

function checkUser(role, requesterID, requestedID) {
  if (role != "Admin" && requesterID != requestedID) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  return true;
}

async function verifyAccessToken(token) {
  const decodedToken = await jwt.verify(
    token,
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

  return decodedToken;
}
