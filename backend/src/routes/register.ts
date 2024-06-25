import express from "express";
import { handleNewUser } from "../controllers/registerController";

export const registerRouter = express.Router();

registerRouter.post("/", handleNewUser);
