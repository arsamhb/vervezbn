import express from "express";
import { handleLogout } from "../controllers/logoutContoller";

export const logoutRouter = express.Router();

logoutRouter.post("/", handleLogout);
