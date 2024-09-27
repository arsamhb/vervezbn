import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const validateGetUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "user id should be provided" });
  }

  next();
};

export const validatePostUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "user id should be provided" });
  }

  const postUserInfoSchema = z.object({
    firstName: z.string().min(3).optional(),
    lastName: z.string().min(3).optional(),
    phoneNumber: z.string().length(12).regex(/^\d+$/).optional(),
    birthDate: z.string().datetime().optional(),
  });

  try {
    postUserInfoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }
};
