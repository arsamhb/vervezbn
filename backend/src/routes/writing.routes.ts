import { Router } from "express";
import { purchaseWriting } from "../controllers/writing/writing.controller";

const router = Router();

router.post("/purchase-task", purchaseWriting);

export default router;
