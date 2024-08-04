import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const validateGetUserInfo = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    
    if (!userId) {
        return res.status(400).json({ message: "user id should be provided" })
    }

    const userInfoRequestSchema = z.string()

    try {
        userInfoRequestSchema.parse(req.body)
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
    }
}