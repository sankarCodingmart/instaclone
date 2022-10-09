import * as dotenv from "dotenv";
dotenv.config();
export default {
  email: process.env.OTPMAIL,
  password: process.env.OTPPWD,
};
