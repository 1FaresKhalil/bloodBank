const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

class UserService {
  async signUp(data, req) {
    try {
      const user = await User.findOne({ username: data.username });
      if (!user) {
        data.password = await bcrypt.hash(data.password, 10);
        data.verified = false;

        const new_user = new User(data);

        await new_user.save();
        // console.log(new_user);
        let verificationToken = jwt.sign(
          {
            username: new_user.username,
            id: new_user._id,
          },
          "loginccqq"
        );

        this.sendVerificationEmail(
          data.username,
          verificationToken,
          req,
          data.isAdmin
        );
        return true;
      } else {
        return "the username already exists use another one!";
      }
    } catch (e) {
      return false;
    }
  }

  async login(username, password) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return { statues: false, message: "user not found" };
      } else {
        if (!(await bcrypt.compare(password, user.password))) {
          return { statues: false, message: "password wrong" };
        } else {
          let loginToken = jwt.sign(
            { username: user.username, id: user._id, isAdmin: user.isAdmin },
            "loginccqq"
          );
          return {
            statues: true,
            message: "login successfully",
            token: loginToken,
          };
        }
      }
    } catch (e) {
      return null;
    }
  }

  async listAllUsers() {
    try {
      return await User.find({});
    } catch (e) {
      return null;
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return null;
      } else {
        return user;
      }
    } catch (e) {
      return null;
    }
  }

  async deleteUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return null;
      } else {
        console.log(user);
        return await User.deleteOne({ _id: id });
      }
    } catch (e) {
      // console.log(e);
      return null;
    }
  }

  async updateUserById(id, data) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return null;
      } else {
        return await User.updateOne({ _id: id }, data);
      }
    } catch (e) {
      return null;
    }
  }

  async getProfile(token) {
    try {
      let data_from_token = await this.extractInfoFromToken(token);
      let [, id] = data_from_token;
      return await User.findById(id);
    } catch (e) {
      return null;
    }
  }

  async updateUserProfile(token, data) {
    try {
      let data_from_token = await this.extractInfoFromToken(token);
      let [, id] = data_from_token;
      return await User.updateOne({ _id: id }, data);
    } catch (e) {
      return null;
    }
  }

  async extractInfoFromToken(token) {
    let decoded = jwt.verify(token, "loginccqq");
    return [decoded.username, decoded.id, decoded.isAdmin];
  }

  // key = process.env.SENDGRID_SECRET_KEY
  // transporter = nodemailer.createTransport(
  //   sendGridTransport({
  //     service: "gmail",
  //     auth: {
  //       api_key: this.key
  //     },
  //   })
  // );

  async forgotPassword(req, email) {
    const user = await User.findOne({ username: email });
    if (!user) {
      return "user not found";
    } else {
      let token = jwt.sign({ username: user.username }, "resettoken", {
        expiresIn: "60m",
      });

      let resetLink;
      if (user.isAdmin === true) {
        resetLink = `http://${req.body.hostname}/forgotpassword/reset/${token}`;
      } else {
        resetLink = `http://${req.body.hostname}/forgotpassword/reset/${token}`;
      }

      if (!req.body.hostname && user.isAdmin)
        resetLink = `http://${req.headers.host}/admin/resetpassword/${token}`;
      else if (!req.body.hostname && !user.isAdmin)
        resetLink = `http://${req.headers.host}/website/resetpassword/${token}`;

      const mailOptions = {
        from: process.env.SENDGRID_Email,
        to: email,
        subject: "Reset your password",
        html: `
                        <h1 style="text-align: center;">Blood Bank</h1><p>Please click the following link to reset your password:</p>
                        <a href=${resetLink}>${resetLink}</a>
                        <p style="opacity: 0.9;">Best regards,</p>
                        <p style="opacity: 0.9;">Your Website Team</p>
                        `,
      };

      try {
        const transporter = nodemailer.createTransport(
          sendGridTransport({
            auth: {
              api_key: process.env.SENDGRID_SECRET_KEY,
            },
          })
        );
        await transporter.sendMail(mailOptions);

        return {
          message: "Email sent",
          resetLink: resetLink,
        };
      } catch (error) {
        console.error(error);
        return "Error sending email";
      }
    }
  }

  async resetPassword(resetToken, newPassword) {
    try {
      let decoded = jwt.verify(resetToken, "resettoken");
      const user = await User.findOne({ username: decoded.username });
      if (!user) {
        return "The user not found";
      } else {
        try {
          newPassword = await bcrypt.hash(newPassword, 10);
          return User.updateOne(
            { username: user.username },
            { password: newPassword }
          );
        } catch (e) {
          return null;
        }
      }
    } catch (e) {
      return null;
    }
  }

  async changePassword(username, oldPassword, newPassword) {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return "The user not found";
      } else {
        if (await bcrypt.compare(oldPassword, user.password)) {
          newPassword = await bcrypt.hash(newPassword, 10);
          return User.updateOne(
            { username: username },
            { password: newPassword }
          );
        } else {
          return "The old password wrong";
        }
      }
    } catch (e) {
      return null;
    }
  }

  async sendVerificationEmail(to, verificationToken, req, isAdmin) {
    // console.log("ff");

    const transporter = nodemailer.createTransport(
      sendGridTransport({
        auth: {
          api_key: process.env.SENDGRID_SECRET_KEY,
        },
      })
    );
    // console.log(req.body);
    let verifyUrl;
    if (isAdmin === true) {
      verifyUrl = `http://${req.body.hostname}/verifyemail/${verificationToken}`;
    } else {
      verifyUrl = `http://${req.body.hostname}/verifyemail/${verificationToken}`;
    }

    if (!req.body.hostname && isAdmin)
      verifyUrl = `http://${req.headers.host}/admin/verification/${verificationToken}`;
    else if (!req.body.hostname && !isAdmin)
      verifyUrl = `http://${req.headers.host}/website/verification/${verificationToken}`;

    const message = `<div>please verify your email</div>
    <a href=${verifyUrl}>
    <button>verify</button>
    </a>
    `;

    await transporter.sendMail({
      to: to,
      from: "abdoshookry2001@gmail.com",
      subject: "verify email",
      html: message,
    });
  }

  async accountVerification(token) {
    try {
      let data_from_token = await this.extractInfoFromToken(token);

      let [, id] = data_from_token;
      let user = await User.findById(id);
      if (!user) {
        return "user not found";
      } else {
        return await User.updateOne({ _id: id }, { verified: true });
      }
    } catch (e) {
      return null;
    }
  }
}

module.exports = {
  UserService,
};
