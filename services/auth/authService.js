import { db } from "../../models";
import { Op } from "sequelize";
import config from "../../config/auth.config";
import validateEmail from "../../helper/validateEmail";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createLoginActivity from "../../middleware/loginActivity/createLoginActivity";
const Account = db.account;
const Otp = db.otp;
const signUp = async (req, res) => {
  try {
    const otp = req.body.otp;
    let expiresIn = new Date(new Date().getTime() - 10 * 60 * 1000);
    const dbOtp = await Otp.findOne({
      where: {
        mail_id: req.body.email,
        otp_code: otp,
        createdAt: {
          [Op.gte]: expiresIn,
        },
      },
    });
    // console.log(dbOtp);
    if (dbOtp && Object.keys(JSON.parse(JSON.stringify(dbOtp))).length === 0) {
      return res.status(200).send("Invalid OTP");
    }
    await Otp.destroy({
      where: {
        mail_id: req.body.email,
      },
    });
    const account = await Account.create({
      user_name: req.body.userName,
      password: bcrypt.hashSync(req.body.password, 8),
      email: req.body.email,
      phone_number: req.body.phoneNumber,
      name: req.body.name,
    });
    if (account) {
      signIn(req, res);
      // res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const signIn = async (req, res) => {
  try {
    const accId = req.body.userName || req.body.email || req.body.phoneNumber;
    let account;
    console.log(typeof accId);
    if (typeof accId === "string" && validateEmail(accId)) {
      account = await Account.findOne({
        where: {
          email: req.body.userName,
        },
      });
    } else if (typeof accId === "string") {
      account = await Account.findOne({
        where: {
          user_name: req.body.userName,
        },
      });
    } else {
      account = await Account.findOne({
        where: {
          phone_number: req.body.userName,
        },
      });
    }
    if (!account)
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Username",
      });
    const passwordValid = bcrypt.compareSync(
      req.body.password,
      account.password
    );
    if (!passwordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Username or Password",
      });
    }
    // console.log(account);
    let token = jwt.sign({ id: account.id }, config.secret, {
      expiresIn: 86400,
    });
    res.setHeader("Set-Cookie", `jwt=${token};Path=/;HttpOnly`);
    await createLoginActivity({
      deviceName: req.body.deviceName,
      userId: account.id,
      location: req.body.location,
      token: token,
    });
    return res.status(200).send({
      id: account.id,
      userName: account.user_name,
      email: account.email,
      name: account.name,
      phoneNumber: account.phone_number,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export { signIn, signUp };
