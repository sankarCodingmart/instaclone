import { Client } from "@elastic/elasticsearch";
import { config } from "dotenv";
config();
export default new Client({
  cloud: {
    id: process.env.CLOUDID,
  },
  auth: {
    username: process.env.ESUSERNAME,
    password: process.env.ESPWD,
  },
});
