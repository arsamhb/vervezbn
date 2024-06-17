import express from "express";
import { handleNewUser } from "../controllers/registerController";

export const router = express.Router();

router.post("/", handleNewUser);
