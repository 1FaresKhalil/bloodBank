const db = require("../database/db_connection");

class jwt_refresh_token {
  constructor(token, expires_at, created_by_ip) {
    this.token = token;
    this.expires_at = expires_at;
    this.created_by_ip = created_by_ip;
    this.revoked_at = null;
    this.revoked_by_ip = null;
    this.replacedByToken = null;
  }

  async save() {
    return db.execute(
      "insert into jwt_refresh_token (token, expires_at, created_at, created_by_ip, revoked_at, revoked_by_ip, replacedByToken) VALUES (?, ?, NOW(), ?, ?, ?, ?)",
      [
        this.token,
        this.expires_at,
        this.created_by_ip,
        this.revoked_at,
        this.revoked_by_ip,
        this.replacedByToken,
      ]
    );
  }

  static async isActive(expires_at, revoked_at) {
    return !(Date.now() >= expires_at || revoked_at);
  }

  static async deleteById(id) {}

  static async fetchAll() {
    const temp = await db.execute("SELECT * FROM jwt_refresh_token");

    return temp[0];
  }

  static async revokeToken(revoked_at, revoked_by_ip, replacedByToken, token) {
    return db.execute(
      "UPDATE jwt_refresh_token SET revoked_at = ?, revoked_by_ip = ?, replacedByToken = ? WHERE token = ?;",
      [revoked_at, revoked_by_ip, replacedByToken, token]
    );
  }

  static async findByToken(token) {
    const temp = await db.execute(
      "SELECT * FROM jwt_refresh_token WHERE token = ?",
      [token]
    );

    return getData(temp);
  }

  static async findById(id) {
    const temp = await db.execute(
      "SELECT * FROM jwt_refresh_token WHERE refresh_tokenID = ?",
      [id]
    );
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

module.exports = jwt_refresh_token;
