const db = require("../database/db_connection");

class blood_request {
  constructor(requesterID, city, location) {
    this.requesterID = requesterID;
    this.city = city;
    this.location = location;
  }

  async save() {
    return db.execute(
      "insert into blood_request (requesterID, city, location, timestamp, active) VALUES (?, ?, ?, NOW(), TRUE)",
      [this.requesterID, this.city, this.location]
    );
  }

  static async deleteById(id) {}

  static async fetchActive() {
    const temp = await db.execute(
      "SELECT * FROM blood_request where active IS TRUE"
    );
    return temp[0];
  }

  static async fetchAll() {
    const temp = await db.execute("SELECT * FROM blood_request");
    return temp[0];
  }

  static async findById(id) {
    const temp = await db.execute(
      "SELECT * FROM blood_request WHERE blood_requestID = ?",
      [id]
    );

    return getData(temp);
  }
}

function getData(temp) {
  const data = temp[0][0];

  if (!data) return;

  obj = new blood_request();

  Object.assign(obj, data);

  return obj;
}

module.exports = blood_request;
