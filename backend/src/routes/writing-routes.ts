import { Router } from "express";
import { getWriting, submitWriting } from "../controllers/writing.controller";

export const writingRouter = Router();

writingRouter.get("/", getWriting)
writingRouter.post("/", submitWriting)


