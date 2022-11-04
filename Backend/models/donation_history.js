const db = require("../database/db_connection");

class donation_history {
  constructor(blood_requestID, userID) {
    this.blood_requestID = blood_requestID;
    this.userID = userID;
  }

  async save() {
    return db.execute(
      "insert into donation_history (blood_requestID, userID, timestamp) values (?,?, NOW())",
      [this.blood_requestID, this.userID]
    );
  }

  static async deleteById(id) {}

  static async fetchAll() {
    const temp = await db.execute(`SELECT * FROM donation_history  
    INNER JOIN blood_request ON blood_request.blood_requestID = donation_history.blood_requestID`);
    return temp[0];
  }

  static async findByBloodRequest(blood_requestID) {
    const temp = await db.execute(
      `SELECT * FROM donation_history
    INNER JOIN blood_request ON blood_request.blood_requestID = donation_history.blood_requestID
    WHERE donation_history.blood_requestID = ?`,
      [blood_requestID]
    );

    return getData(temp);
  }

  static async findByUser(userID) {
    const temp = await db.execute(
      `SELECT * FROM donation_history
    INNER JOIN blood_request ON blood_request.blood_requestID = donation_history.blood_requestID
    WHERE donation_history.userID = ?`,
      [userID]
    );

    return getData(temp);
  }

  static async findById(id) {
    const temp = await db.execute(
      `SELECT * FROM donation_history
    INNER JOIN blood_request ON blood_request.blood_requestID = donation_history.blood_requestID
    WHERE donation_history.donation_historyID = ?`,
      [id]
    );

    return getData(temp);
  }
}

function getData(temp) {
  const data = temp[0][0];

  if (!data) return;

  obj = new (data.blood_requestID, data.userID)();

  Object.assign(obj, data);

  return obj;
}

module.exports = donation_history;
