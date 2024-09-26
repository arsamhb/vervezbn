import { Request, Response } from "express";
import { getUserById, getUserInfoById, updateUserInfo } from "../repositories/user.repository";
import dotenv from "dotenv";
import { DEFAULT_SKIP, DEFAULT_TAKE } from "@/constants/pagination";
import { findOneUsersWriting, findUsersWriting } from "@/repositories/writing.repository";

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

export const getUsersWritings = async (req: Request, res: Response) => {
    const userId = req.params.id;

    const skip = parseInt(req.query.skip as string, 10) || DEFAULT_SKIP
    const take = parseInt(req.query.take as string, 10) || DEFAULT_TAKE

    const user = await getUserById(userId);
    if (!user)
        return res
            .status(404)
            .json({ message: "We did not found the user" });

    try {
        const writings = await findUsersWriting(userId, skip, take)
        return res.status(200).json({ data: writings })
    } catch (error) {
        return res.status(500).json({ error: "internal server error" })
    }
}

export const getUserSingleWriting = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const writingId = req.params.writingId;

    const user = await getUserById(userId);
    if (!user)
        return res
            .status(404)
            .json({ message: "We did not found the user" });

    try {
        const writing = await findOneUsersWriting(writingId)
        if (writing?.userId === userId) {
            return res.status(200).json({ data: writing })
        } else {
            return res.status(403).json({ message: "You do not have access to this writing" })
        }
    } catch (error) {
        return res.status(500).json({ error: "internal server error" })
    }
}