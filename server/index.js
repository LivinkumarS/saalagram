import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./Routes/user.route.js";
import AuthRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import PostRouter from "./Routes/post.route.js";
import CommentRouter from "./Routes/comment.route.js";
import quoteRouter from "./Routes/quote.route.js";
import path from "path";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

console.log(process.env.DATABASE);

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Database Connected...!");
  })
  .catch((err) => {
    console.log("Vanakkam Da Mapla...!");
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
  console.log("Listening On 3000!");
});

app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/quote", quoteRouter);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error Handling
app.use((err, req, res, next) => {
  const success = false;
  const statusCode = err.statusCode || 400;
  const message = err.message || "internal Server Error";
  res.status(statusCode).json({ success, statusCode, message });
});
