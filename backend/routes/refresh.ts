import express from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const router = express.Router();

router.post("/", handleRefreshToken);

module.exports = router;
