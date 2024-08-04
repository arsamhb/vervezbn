import { Router } from "express"
import { getUserInfo } from "../controllers/user.controller"
import { validateGetUserInfo } from "@/middleware/user-validation-middleware"

export const userRouter = Router()

userRouter.get(`/info/:id`, validateGetUserInfo, getUserInfo)