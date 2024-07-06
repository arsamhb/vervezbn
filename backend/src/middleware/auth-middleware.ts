import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateLogin = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors })
        }
        next(error)
    }
}

export const validateSignUp = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors })
        }
        next(error)
    }
}