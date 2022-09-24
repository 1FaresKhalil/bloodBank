const Role = require("../models/role");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  /* 
if first time you must insert a role execute this query
insert into blood_bank.role (role_name, role_description) VALUES ('user', 'user desc');
*/

  try {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User(null, email, name, hashedPw, null, null, 1);

    await user.save();
    res.status(201).json({ message: "User created!" });
  } catch (err) {
    if (err.code == "ER_DUP_ENTRY") {
      err.statusCode = 409;
    } else if (!err.statusCode) {
      err.statusCode = 500;
    }

    console.log(err.code);
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const data = await User.findByEmail(email);
    const user = data[0][0];

    if (!user) {
      const error = new Error("Wrong email or password!");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("Wrong email or password!");
      error.statusCode = 401;
      throw error;
    }

    await User.editById(user.userID);

    res.status(200).json({ message: "user found" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
