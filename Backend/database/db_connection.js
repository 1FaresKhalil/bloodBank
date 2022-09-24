const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST /*"localhost"*/,
  user: process.env.DB_USER /*"root"*/,
  database: process.env.DB_NAME /*"blood_bank"*/,
  password: process.env.DB_PASSWORD /*"12345"*/,
});

module.exports = pool.promise();
