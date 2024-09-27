import dotenv from "dotenv";

dotenv.config();

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[`${key}`];
  if (!value) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  PORT: parseInt(getEnvVariable("PORT", "3000"), 10),
  ACCESS_TOKEN_SECRET: getEnvVariable("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnvVariable("REFRESH_TOKEN_SECRET"),
  WRITING_PREMIUM_TASK_PRICE: getEnvVariable("WRITING_PREMIUM_TASK_PRICE"),
  SINGLE_TOKEN_VALUE_IN_RIAL: getEnvVariable("SINGLE_TOKEN_VALUE_IN_RIAL"),
};
