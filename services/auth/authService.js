import { db } from "../../models";
import config from "../../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createLoginActivity from "../../middleware/loginActivity/createLoginActivity";
const Account = db.account;
const Otp = db.otp;
const signUp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const dbOtp = await Otp.findOne({
      where: {
        mail_id: req.body.email,
        otp_code: otp,
      },
    });
    console.log(dbOtp);
    if (dbOtp && Object.keys(JSON.parse(JSON.stringify(dbOtp))).length === 0) {
      return res.status(200).send("Invalid OTP");
    }
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
    let account = await Account.findOne({
      where: {
        user_name: req.body.userName,
      },
    });
    account =
      account ??
      (await Account.findOne({
        where: {
          email: req.body.email,
        },
      }));
    account =
      account ??
      (await Account.findOne({
        where: {
          phone_number: req.body.phoneNumber,
        },
      }));
    const passwordValid = bcrypt.compareSync(
      req.body.password,
      account.password
    );
    if (!passwordValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
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
