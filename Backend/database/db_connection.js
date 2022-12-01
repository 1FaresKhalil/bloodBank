const mysql = require("mysql2");

try {
  const pool = mysql.createPool({
    host: process.env.DB_HOST /*"localhost"*/,
    user: process.env.DB_USER /*"root"*/,
    database: process.env.DB_NAME /*"blood_bank"*/,
    password: process.env.DB_PASSWORD /*"12345"*/,
  });

  module.exports = pool.promise();
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
    err.message = "database error";
  }
  next(err);
}
