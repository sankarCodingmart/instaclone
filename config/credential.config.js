import * as dotenv from "dotenv";
dotenv.config();
export default {
  email: process.env.NODEMAILEREMAIL,
  password: process.env.NODEMAILERPWD,
};
