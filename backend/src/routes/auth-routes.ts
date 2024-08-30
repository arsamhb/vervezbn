import express from "express";
import { signUp, refreshToken, logout, login } from "../controllers/auth.controller";

import { validateLogin, validateSignUp } from "@/middleware/validations/auth-validation-middleware"

export const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);
authRouter.post("/register", validateSignUp, signUp);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refreshToken);
