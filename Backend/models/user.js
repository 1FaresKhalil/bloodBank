const db = require("../database/db_connection");

class user {
  constructor(id, email, name, password, phone, blood_type, role) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.blood_type = blood_type;
    this.role = role;
  }

  async save() {
    return db.execute(
      "insert into user (email, name, password, phone, blood_type, last_login, created_at, role) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?)",
      [
        this.email,
        this.name,
        this.password,
        this.phone,
        this.blood_type,
        this.role,
      ]
    );
  }

  static async deleteById(id) {}

  static async fetchAll() {
    return db.execute("SELECT * FROM blood_bank.user");
  }

  static async editById(id) {
    return db.execute("update user set last_login = NOW() where userId = ?", [
      id,
    ]);
  }

  static async findByEmail(email) {
    return db.execute("SELECT * FROM user WHERE user.email = ?", [email]);
  }
  static async findById(id) {
    return db.execute("SELECT * FROM user WHERE user.id = ?", [id]);
  }
}

module.exports = user;
