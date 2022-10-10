import { db } from "../../models";
import { Op } from "sequelize";
import config from "../../config/auth.config";
import validateEmail from "../../helper/validateEmail";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createLoginActivity from "../../middleware/loginActivity/createLoginActivity";
import Joi from "joi";

const NotificationSettings = db.notificationSettings;
const Account = db.account;
const Otp = db.otp;
const signUp = async (req, res) => {
  const Schema = Joi.object().keys({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(6).max(30).required(),
    otp: Joi.string().min(5).max(10).required(),
    password: Joi.string().min(8).max(15).required(),
    deviceName: Joi.string().required(),
    location: Joi.string().alphanum().required(),
    phoneNumber: Joi.number().integer(),
    name: Joi.string().min(3).max(30).required(),
  });

  const result = Schema.validate(req.body);
  if (result.error) {
    console.log(result.error);
    return res.status(500).send({ accessToken: null, error: result.error });
  }

  try {
    const otp = Number(req.body.otp);
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
    await NotificationSettings.create({
      user_id: account.dataValues.id,
    });
    if (account) {
      await signIn(req, res);
      // res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
const signIn = async (req, res) => {
  const Schema = Joi.object().keys({
    userName: Joi.string().min(3).max(30),
    email: Joi.string().min(6).max(30),
    password: Joi.string().min(8).max(20).required(),
    deviceName: Joi.string().required(),
    location: Joi.string().alphanum().required(),
    phoneNumber: Joi.string(),
  });
  const result = Schema.validate(req.body);
  if (result.error) {
    // console.log(result);
    console.log(result.error);
    return res.status(500).send({ accessToken: null, error: result.error });
  }

  try {
    const accId = req.body.userName || req.body.email || req.body.phoneNumber;
    let account;
    if (typeof accId === "string" && validateEmail(accId)) {
      account = await Account.findOne({
        where: {
          email: req.body.userName,
        },
      });
    } else if (typeof accId === "string" && isNaN(accId)) {
      account = await Account.findOne({
        where: {
          user_name: req.body.userName,
        },
      });
    } else {
      account = await Account.findOne({
        where: {
          phone_number: Number(req.body.userName),
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
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
export { signIn, signUp };
