import { Router } from "express";
import { getUsersWritings, getWriting, submitWriting } from "../controllers/writing.controller";
import {
  validateGetWriting,
  validateSubmitWriting,
} from "@/middleware/writing-validation-middleware";

export const writingRouter = Router();

writingRouter.get("/:id", validateGetWriting, getWriting);
writingRouter.post("/:id", validateSubmitWriting, submitWriting);
writingRouter.get("/:id/writings", getUsersWritings)