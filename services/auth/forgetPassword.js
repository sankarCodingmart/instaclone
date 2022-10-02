import { db } from "../../models";
import bcrypt from "bcryptjs";
import { signIn } from "../auth/authService";
const Account = db.account;
const Otp = db.otp;
const verifyForgetPassword = async (req, res) => {
  const Schema = Joi.object().keys({
    userName: Joi.string().alphanum().min(3).max(12),
    email: Joi.string().alphanum().min(6).max(20).required(),
    otp: Joi.number().integer().min(6).max(6).required(),
    password: Joi.string().alphanum().min(8).max(15).required(),
    deviceName: Joi.string().alphanum().required(),
    location: Joi.string().alphanum().required(),
    phoneNumber: Joi.number().integer().min(10).max(10),
  });

  const result = Joi.validate(req.body, Schema);
  if (result.error !== null)
    return res.status(500).send("Invalid signup data " + result.err);

  try {
    const otp = req.body.otp;
    const dbOtp = await Otp.findOne({
      where: {
        mail_id: req.body.email,
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
