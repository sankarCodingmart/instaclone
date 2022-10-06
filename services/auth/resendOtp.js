import nodemailer from "nodemailer";
import { db } from "../../models";
import dotenv from "dotenv";
import credentialConfig from "../../config/credential.config";
const Otp = db.otp;
dotenv.config();

const resendOtp = (req, res) => {
  // console.log(process.env);
  // console.log("hello");
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
    return res.status(500).send(result.error);
  }
  const mail_id = req.body.email;
  const otp = Math.floor(100000 + Math.random() * 900000);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentialConfig.email,
      pass: credentialConfig.password,
    },
  });

  let mailOptions = {
    from: credentialConfig.email,
    to: mail_id,
    subject: "OTP verification",
    text: `Your One Time Password for Signup for instaclone is ${otp}`,
  };
  transporter.sendMail(mailOptions, async function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    } else {
      await Otp.update(
        {
          otp_code: otp,
        },
        {
          where: {
            mail_id: mail_id,
          },
        }
      );
      return res.status(200).send("otp sent successfully");
    }
  });
  //
};

export default resendOtp;
