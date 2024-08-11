import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const validateGetWriting = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const taskType = req.query.type;

  if (!userId) {
    return res.status(400).json({ error: "user id should be provided" });
  }
  if (!taskType) {
    return res.status(400).json({ error: "task type should be provided" });
  }
  if (taskType !== "letter" && taskType !== "essay") {
    return res
      .status(400)
      .json({ error: "task type should be essay or letter" });
  }

  next();
};

export const validateSubmitWriting = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  const { writingId, writing } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "user id should be provided" });
  }
  if (!writingId || !writing) {
    return res
      .status(400)
      .json({ error: "writing id and writing should be provided" });
  }

  next();
};
