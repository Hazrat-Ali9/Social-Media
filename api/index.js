import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import userRoute from "./routes/users.js";
import authRouter from "./routes/auth.js";
import { dbConnection } from "./utils/config.js";
import postRouter from "./routes/posts.js";
import cors from "cors";
// import multer from "multer";
// import path from "path";

const app = express();
dotenv.config();
dbConnection();

// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(new URL(import.meta.url).pathname + "public/images"));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("common"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/assets");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer( { storage });
// // routes
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploaded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

// auth api
app.use("/api/auth", authRouter);
// user api
app.use("/api/users", userRoute);
// post api
app.use("/api/posts", postRouter);

// server checking
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
