import express from "express";
import { signUp, refreshToken, logout, login } from "../controllers/auth.controller";

import { validateLogin, validateSignUp } from "@/middleware/auth-middleware"
import { LoginSchema, SignUpSchema } from "@/schema/auth-schema"

export const registerRouter = express.Router();
export const refreshRouter = express.Router();
export const authRouter = express.Router();
export const logoutRouter = express.Router();

logoutRouter.post("/", logout);

authRouter.post("/", validateLogin(LoginSchema), login);

refreshRouter.post("/", refreshToken);

registerRouter.post("/", validateSignUp(SignUpSchema), signUp);
