import { db } from "../../models";
import bcrypt from "bcryptjs";
import { signIn } from "../auth/authService";
const Account = db.account;
const Otp = db.otp;
const verifyForgetPassword = async (req, res) => {
  try {
    const otp = req.body.otp;
    const dbOtp = await Otp.findOne({
      where: {
        mail_id: req.body.mailId,
        otp_code: otp,
      },
    });
    console.log(dbOtp);
    if (Object.keys(JSON.parse(dbOtp)).length === 0) {
      return res.status(200).send("Invalid OTP");
    }
    await Account.update({
      password: bcrypt.hashSync(req.body.password, 8),
    });
    signIn(req, res);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export { verifyForgetPassword };
