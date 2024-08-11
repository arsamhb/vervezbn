import { Router } from "express"
import { getUserInfo,postUserInfo } from "../controllers/user.controller"
import { validateGetUserInfo,validatePostUserInfo } from "@/middleware/user-validation-middleware"

export const userRouter = Router()

userRouter.get(`/info/:id`, validateGetUserInfo, getUserInfo)
userRouter.post(`/info/:id`, validatePostUserInfo, postUserInfo)