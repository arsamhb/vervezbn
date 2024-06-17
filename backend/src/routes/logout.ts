import express from "express";
import { handleLogout } from "../controllers/logoutContoller";

export const router = express.Router();

router.post("/", handleLogout);
