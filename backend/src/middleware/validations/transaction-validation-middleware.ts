import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { ENV } from "@/config/env.config";
import { ERRORS } from "@/constants/response.messages";

dotenv.config();

const { SINGLE_TOKEN_VALUE_IN_RIAL } = ENV;

const validateChargeAmount = (amount: number) => {
  return (
    amount > parseInt(SINGLE_TOKEN_VALUE_IN_RIAL as string, 10) &&
    amount % parseInt(SINGLE_TOKEN_VALUE_IN_RIAL as string, 10) === 0
  );
};

export const validateTransactionCharge = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!SINGLE_TOKEN_VALUE_IN_RIAL) {
    return res.status(500).json({
      message: ERRORS.ENV_VAR_NOT_FOUND,
    });
  }

  const chargeWalletTransactionSchema = z.object({
    amount: z
      .number()
      .gt(parseInt(SINGLE_TOKEN_VALUE_IN_RIAL as string, 10))
      .refine(validateChargeAmount, {
        message: `Amount must be a multiple of ${SINGLE_TOKEN_VALUE_IN_RIAL}`,
      }),
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
