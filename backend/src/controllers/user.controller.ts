import { Request, Response } from "express";
import { getUserInfoById } from "../repositories/user.repository";
import dotenv from "dotenv";

dotenv.config();

export const getUserInfo = async (req: Request, res: Response) => {
    const userId = req.params.id

    const userInfo = await getUserInfoById(userId)

    if (!userInfo) {
        return res.status(404).json({ message: "we did not find user" })
    }

    res.status(200).json({ data: userInfo })
}