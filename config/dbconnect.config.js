import * as dotenv from "dotenv";
dotenv.config();
// console.log(process.env.DB);
export default {
  HOST: process.env.HOST,
  USER: process.env.DBUSER,
  PASSWORD: process.env.PASSWORD,
  DB: process.env.DB,
  dialect: process.env.DIALECT,
};
