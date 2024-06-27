import express from "express";
import { handleLogout } from "../services/auth/controllers/logout.controller";

export const logoutRouter = express.Router();

logoutRouter.post("/", handleLogout);
