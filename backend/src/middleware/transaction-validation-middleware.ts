import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const validateTransactionChargeRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!process.env.SINGLE_TOKEN_VALUE_IN_RIAL) {
    return res.status(500).json({
      message: "something bad happened to us visit us a few moment later",
    });
  }

  const chargeWalletTransactionSchema = z.object({
    amount: z
      .number()
      .gt(parseInt(process.env.SINGLE_TOKEN_VALUE_IN_RIAL as string, 10)).refine(
        (amount) => amount % parseInt(process.env.SINGLE_TOKEN_VALUE_IN_RIAL as string, 10) === 0,
        {
          message: `Amount must be a multiple of ${process.env.SINGLE_TOKEN_VALUE_IN_RIAL}`,
        }
      ),
    id: z.string(),
  });

  try {
    chargeWalletTransactionSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
};
