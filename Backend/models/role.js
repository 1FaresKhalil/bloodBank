const db = require("../database/db_connection");

class role {
  constructor(id, role_name, role_desc) {
    this.id = id;
    this.role_name = role_name;
    this.role_desc = role_desc;
  }

  async save() {
    return db.execute(
      "insert into role (role_name, role_description) VALUES (?, ?)",
      [this.role_name, this.role_desc]
    );
  }

  static async deleteById(id) {}

  static async fetchAll() {
    return db.execute("SELECT * FROM role");
  }

  static async findById(id) {
    return db.execute("SELECT * FROM role WHERE role.id = ?", [id]);
  }
}

module.exports = role;
