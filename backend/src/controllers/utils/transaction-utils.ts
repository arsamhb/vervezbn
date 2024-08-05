import dotenv from "dotenv";

dotenv.config();

export const convertRialToCoin = (amountInRial: number): number => {
    if (!process.env.SINGLE_TOKEN_VALUE_IN_RIAL) {
        return -1
    }

    return amountInRial / parseInt(process.env.SINGLE_TOKEN_VALUE_IN_RIAL, 10)
}