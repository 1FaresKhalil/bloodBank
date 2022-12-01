const db = require("../database/db_connection");

class role {
  constructor(role_name, role_desc) {
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
    const temp = await db.execute("SELECT * FROM role");
    return temp[0];
  }

  static async findById(id) {
    const temp = await db.execute("SELECT * FROM role WHERE role.roleID = ?", [
      id,
    ]);

    return getData(temp);
  }
}

function getData(temp) {
  const data = temp[0][0];

  if (!data) return;

  obj = new jwt_refresh_token(data.token, data.expires_at, data.created_by_ip);

  Object.assign(obj, data);

  return obj;
}

module.exports = role;
