import { Request, Response } from "express";
import { getUserById, getUserInfoById, updateUserInfo } from "../repositories/user.repository";
import dotenv from "dotenv";

dotenv.config();

export const getUserInfo = async (req: Request, res: Response) => {
    const userId = req.params.id

    const userInfo = await getUserInfoById(userId)

    if (!userInfo) {
        return res.status(404).json({ error: "we did not find user" })
    }

    res.status(200).json({ data: userInfo })
}

export const postUserInfo = async (req: Request, res: Response) => {
    const userId = req.params.id

    const user = await getUserById(userId)

    if (!user) {
        return res.status(404).json({ error: "we did not find user" })
    }

    try {
        const updatedUser = await updateUserInfo(user.id, req.body)
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: "we could'nt make it" })
    }

}