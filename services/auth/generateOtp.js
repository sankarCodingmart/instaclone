import nodemailer from "nodemailer";
import { db } from "../../models";
import dotenv from "dotenv";
const Otp = db.otp;

const generateOtp = (req, res) => {
  dotenv.config();
  console.log(process.env);
  const mail_id = req.body.mailId;
  const otp = Math.floor(100000 + Math.random() * 900000);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PWD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
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
