import nodemailer from "nodemailer";
import { db } from "../../models";
import dotenv from "dotenv";
import credentialConfig from "../../config/credential.config";
const Otp = db.otp;
dotenv.config();

const generateOtp = (req, res) => {
  // console.log(process.env);
  // console.log("hello");
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
      await Otp.create({
        mail_id: mail_id,
        otp_code: otp,
      });
      return res.status(200).send("otp sent successfully");
    }
  });
  //
};

export default generateOtp;
