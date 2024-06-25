import express from "express";
import { handleLogin } from "../controllers/authController";

export const authRouter = express.Router();

authRouter.post("/", handleLogin);

