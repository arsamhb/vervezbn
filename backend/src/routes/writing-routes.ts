import { Router } from "express";
import { purchaseWriting } from "../controllers/writing.controller";

export const purchaseWritingRouter = Router();

purchaseWritingRouter.post("/", purchaseWriting);

