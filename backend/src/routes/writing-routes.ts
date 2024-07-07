import { Router } from "express";
import { getWriting } from "../controllers/writing.controller";

export const writingRouter = Router();

writingRouter.get("/getWriting", getWriting )


