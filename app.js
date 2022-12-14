import express from "express";
import cookieParser from "cookie-parser";
import { db } from "./models";
import auth from "./routes/auth";
import post from "./routes/post";
import story from "./routes/story";
import feed from "./routes/feed";
import settings from "./routes/settings";
import follow from "./routes/follow";
import message from "./routes/message";
import * as dotenv from "dotenv";
import cors from "cors";
import http from "http";
import socket from "./config/socket.config";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
import createRecords from "./test";

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/feed", feed);
app.use("/user", auth);
app.use("/post", post);
app.use("/story", story);
app.use("/settings", settings);
app.use("/follow", follow);
app.use("/message", message);
socket(server);
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
