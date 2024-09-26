import { Router } from "express";
import {  getWriting, submitWriting } from "../controllers/writing.controller";
import {
  validateGetWriting,
  validateSubmitWriting,
} from "@/middleware/validations/writing-validation-middleware";

export const writingRouter = Router();

writingRouter.get("/:id", validateGetWriting, getWriting);
writingRouter.post("/:id", validateSubmitWriting, submitWriting);
