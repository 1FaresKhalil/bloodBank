const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blood_request = require("../models/blood_request");
const Donation_history = require("../models/donation_history");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { validationResult } = require("express-validator/check");

module.exports = {
  getProfile,
  getbloodRequests,
  getbloodRequest,
  postbloodRequest,
  getdonationHistory,
  getdonateBlood,
  postdonateBlood,
  verifyDonation,
};

async function getProfile(req) {
  checkUser(req.user.role, req.user.id, req.params.userID);

  const user = await User.findById(req.user.id);

  return user;
}

async function getbloodRequests(req) {
  await verifyAccessToken(req.get("Authorization"));

  const blood_requests = await Blood_request.fetchActive();
  return blood_requests;
}

async function getbloodRequest(req) {
  await verifyAccessToken(req.get("Authorization"));

  const blood_request = await Blood_request.findById(req.params.bloodRequestID);
  return blood_request;
}

async function postbloodRequest() {
  await validateBloodRequest(req);

  const decodedToken = await verifyAccessToken(req.get("Authorization"));

  const requesterID = decodedToken.userID;
  const location = req.body.location;
  const city = req.body.city;

  const blood_request = await new Blood_request(requesterID, city, location);
  await blood_request.save();
}

async function validateBloodRequest(req) {
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
        city: req.body.city,
        location: req.body.locaton,
      },
    });
    throw error;
  }
}

async function getdonationHistory(req) {
  checkUser(req.user.role, req.user.id, req.params.userID);
  const user = req.params.userID;

  const donation_history = await Donation_history.findByUser(user.userID);
  return donation_history;
}

async function getdonateBlood(req) {
  const decodedToken = await verifyAccessToken(req.get("Authorization"));
  const user = await User.findById(decodedToken.userID);

  const userInfo = {
    name: user.name,
    city: user.city,
    phone: user.phone,
    blood_type: user.blood_type,
  };

  return userInfo;
}

async function postdonateBlood(req) {
  /*const blood_type = req.body.bloodType;
  const city = req.body.city;
  const name = req.body.name;
  const phone = req.body.phone;
*/
  const decodedToken = await verifyAccessToken(req.get("Authorization"));
  const userID = decodedToken.userID;

  //await User.updateInfoById(name, city, phone, blood_type, userID);

  const verificationToken = randomTokenString();
  const donation_history = new Donation_history(
    req.params.bloodRequestID,
    userID,
    verificationToken
  );
  await donation_history.save();

  const bloodRequest = await Blood_request.findById(req.params.bloodRequestID);
  const requester = await User.findById(bloodRequest.requesterID);
  email = requester.email;
  donor = decodedToken.name;
  sendDonationEmail(email, donor, verificationToken);
}
//not implemented

async function verifyDonation(verificationToken) {
  const donation_history = await Donation_history.findByVerificationToken(
    verificationToken
  );

  if (!donation_history) {
    const error = new Error("verification Failed");
    error.statusCode = 404;
    throw error;
  }

  donation_history.verified = true;
  donation_history.verificationToken = null;
  await donation_history.verifyDonation();
}

async function sendDonationEmail(to, donor, verificationToken) {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.email_api_key,
      },
    })
  );

  const origin = "http://localhost:3002";
  const verifyUrl = `${origin}/verify-donation?token=${verificationToken}`;
  message = `
  <div>${donor.name} يريد التبرع</div>
  <div>قم بالتاكيد انه قد وصل اليك وتبرع</div>
    <a href=${verifyUrl}>
    <button>تاكيد التبرع</button>
    </a>
    `;
  transporter.sendMail({
    to: to,
    from: process.env.email,
    subject: "verify email",
    html: message,
  });
}

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

function randomTokenString() {
  return crypto.randomBytes(64).toString("hex");
}
