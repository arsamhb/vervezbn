import express from "express";
import { handleLogout } from "../controllers/auth/logout.controller";
import { handleLogin } from "../controllers/auth/auth.controller";
import { handleRefreshToken } from "../controllers/auth/refreshTokenController";
import { handleNewUser } from "../controllers/auth/register.controller";

export const registerRouter = express.Router();
export const refreshRouter = express.Router();
export const authRouter = express.Router();
export const logoutRouter = express.Router();

logoutRouter.post("/", handleLogout);

authRouter.post("/", handleLogin);

refreshRouter.post("/", handleRefreshToken);

registerRouter.post("/", handleNewUser);
