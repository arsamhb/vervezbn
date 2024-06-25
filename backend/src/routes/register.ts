import express from "express";
import { handleNewUser } from "../auth/controllers/register.controller";

export const registerRouter = express.Router();

registerRouter.post("/", handleNewUser);
