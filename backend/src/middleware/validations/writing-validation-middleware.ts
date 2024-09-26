import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { z, ZodError } from "zod";

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

  if (!userId) {
    return res.status(400).json({ error: "user id should be provided" });
  }

  const submitWritingSchema = z.object({
    writingId: z.string(),
    writing: z.string(),
  })

  try {
    submitWritingSchema.parse(req.body)
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }
};
