const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const code = crypto.randomBytes(1).toString('hex');
token = jwt.sign({code}, 'authzzzz', {expiresIn: '60m'});
console.log(token)