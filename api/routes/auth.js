import express from "express";
import { loginController, registerController } from "../controllers/authControllers.js";

const authRouter = express.Router();

// register
// post api
// /api/v1/auth/register
authRouter.post("/register", registerController);

// login
// post api
// /api/v1/auth/login
authRouter.post("/login", loginController);

export default authRouter;
