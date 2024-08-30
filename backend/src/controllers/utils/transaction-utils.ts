import { ENV } from "@/config/env.config";
import dotenv from "dotenv";

dotenv.config();

export const convertRialToCoin = (amountInRial: number): number => {
  const { SINGLE_TOKEN_VALUE_IN_RIAL } = ENV;

  if (!SINGLE_TOKEN_VALUE_IN_RIAL) {
    return -1;
  }

  return amountInRial / parseInt(SINGLE_TOKEN_VALUE_IN_RIAL, 10);
};
