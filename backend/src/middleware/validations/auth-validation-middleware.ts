import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const LoginSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3),
  });

  try {
    LoginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SignUpSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3),
  });

  try {
    SignUpSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
