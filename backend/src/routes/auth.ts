import express from "express";
import { handleLogin } from "../services/auth/controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/", handleLogin);

