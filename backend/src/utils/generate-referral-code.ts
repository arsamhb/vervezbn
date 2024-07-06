import { v4 as uuid } from "uuid"
import { isReferralCodeUnique } from "../repositories/user.repository"

export const generateReferralCode = async ():Promise<string> => {
    let referralCode: string = "";
    let isUnique: boolean = false;

    while (!isUnique) {
        referralCode = uuid().split("-")[0]
        isUnique = await isReferralCodeUnique(referralCode)
    }

    return referralCode;
}