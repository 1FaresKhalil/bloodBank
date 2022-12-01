const db = require("../database/db_connection");

class user {
  constructor(
    email,
    name,
    password,
    city,
    phone,
    blood_type,
    role,
    verificationToken
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.city = city;
    this.phone = phone;
    this.blood_type = blood_type;
    this.role = role;
    this.verificationToken = verificationToken;
  }

  async save() {
    return db.execute(
      "insert into user (email, name, password, city, phone, blood_type, last_login, created_at, role, verificationToken) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)",
      [
        this.email,
        this.name,
        this.password,
        this.city,
        this.phone,
        this.blood_type,
        this.role,
        this.verificationToken,
      ]
    );
  }

  async verifyEmail() {
    return db.execute(
      "update user set verified = 1, verificationToken = NULL where userId = ?",
      [this.userID]
    );
  }

  static async loginById(id) {
    return db.execute("update user set last_login = NOW() where userId = ?", [
      id,
    ]);
  }

  static async updateInfoById(name, city, phone, blood_type, id) {
    return db.execute(
      "update user set name = ?, city = ?, phone = ?, blood_type = ?,   where userId = ?",
      [name, city, phone, blood_type, id]
    );
  }

  static async deleteById(id) {}

  static async fetchAll() {
    const temp = await db.execute("SELECT * FROM user");
    return temp[0];
  }

  static async joinRole(id) {
    const temp = await db.execute(
      "select * from user INNER JOIN role ON role.roleID = user.role where userID = ?;",
      [id]
    );

    return getData(temp);
  }

  static async findByEmail(email) {
    const temp = await db.execute("SELECT * FROM user WHERE user.email = ?", [
      email,
    ]);

    return getData(temp);
  }

  static async findById(id) {
    const temp = await db.execute("SELECT * FROM user WHERE user.userID = ?", [
      id,
    ]);

    return getData(temp);
  }

  static async findByVerificationToken(token) {
    const temp = await db.execute(
      "SELECT * FROM user WHERE user.verificationToken = ?",
      [token]
    );

    return getData(temp);
  }
}

function getData(temp) {
  const data = temp[0][0];

  if (!data) return;

  obj = new user(
    data.email,
    data.name,
    data.password,
    data.phone,
    data.blood_type,
    data.role
  );

  Object.assign(obj, data);

  return obj;
}

module.exports = user;
