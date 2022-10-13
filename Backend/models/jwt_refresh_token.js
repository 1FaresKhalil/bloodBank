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
    return Date.now() >= expires_at && !revoked_at;
  }

  static async deleteById(id) {}

  static async fetchAll() {
    return db.execute("SELECT * FROM blood_bank.jwt_refresh_token");
  }

  static async revokeToken(revoked_at, revoked_by_ip, replacedByToken, token) {
    return db.execute(
      "UPDATE jwt_refresh_token SET revoked_at = ?, revoked_by_ip = ?, replacedByToken = ? WHERE token = ?;",
      [revoked_at, revoked_by_ip, replacedByToken, token]
    );
  }

  static async findByToken(token) {
    return db.execute(
      "SELECT * FROM jwt_refresh_token WHERE jwt_refresh_token.token = ?",
      [token]
    );
  }
  static async findById(id) {
    return db.execute(
      "SELECT * FROM jwt_refresh_token WHERE jwt_refresh_token.jwt_refresh_tokenID = ?",
      [id]
    );
  }
}

module.exports = jwt_refresh_token;
