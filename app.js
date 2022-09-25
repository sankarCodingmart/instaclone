import express from "express";
import cookieParser from "cookie-parser";
import { db } from "./models";
import auth from "./routes/auth";
import post from "./routes/post";
import story from "./routes/story";
import feed from "./routes/feed";
import settings from "./routes/settings";
import createRecords from "./test";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/feed", feed);
app.use("/user", auth);
app.use("/post", post);
app.use("/story", story);
app.use("/settings", settings);
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
