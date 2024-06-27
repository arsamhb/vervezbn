import express from "express";
import { handleNewUser } from "../services/auth/controllers/register.controller";

export const registerRouter = express.Router();

registerRouter.post("/", handleNewUser);
