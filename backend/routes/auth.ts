import express from "express";
import { handleLogin } from "../controllers/authController";

export const router = express.Router();

router.post("/", handleLogin);

