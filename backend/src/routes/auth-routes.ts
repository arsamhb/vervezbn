import express from "express";
import { newUser, refreshToken, logout, login } from "../controllers/auth.controller";

import { validateLogin } from "@/middleware/login-middleware"
import { LoginSchema } from "@/schema/auth-schema"

export const registerRouter = express.Router();
export const refreshRouter = express.Router();
export const authRouter = express.Router();
export const logoutRouter = express.Router();

logoutRouter.post("/", logout);

authRouter.post("/", validateLogin(LoginSchema), login);

refreshRouter.post("/", refreshToken);

registerRouter.post("/", newUser);
