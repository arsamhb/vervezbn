import express from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

export const router = express.Router();

router.post("/", handleRefreshToken);

