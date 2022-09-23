import express from "express";
import { db } from "./models";
import auth from "./routes/auth/auth";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", auth);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
