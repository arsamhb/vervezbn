import express from "express";
import { handleLogout } from "../services/auth/controllers/logout.controller";
import { handleLogin } from "../services/auth/controllers/auth.controller";
import { handleRefreshToken } from "../controllers/refreshTokenController";
import { handleNewUser } from "../services/auth/controllers/register.controller";

export const rootRouter = express.Router();
export const registerRouter = express.Router();
export const refreshRouter = express.Router();
export const authRouter = express.Router();
export const logoutRouter = express.Router();

logoutRouter.post("/", handleLogout);

authRouter.post("/", handleLogin);

refreshRouter.post("/", handleRefreshToken);

registerRouter.post("/", handleNewUser);

rootRouter.get("^/$|/index(.html)?", (req, res) => {
  res.sendStatus(200);
});
