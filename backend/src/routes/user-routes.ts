import { Router } from "express"
import { getUserInfo, getUserSingleWriting, postUserInfo } from "../controllers/user.controller"
import { validateGetUserInfo, validatePostUserInfo } from "@/middleware/user-validation-middleware"
import { getUsersWritings } from "@/controllers/user.controller"

export const userRouter = Router()

userRouter.get("/info/:id", validateGetUserInfo, getUserInfo)
userRouter.post("/info/:id", validatePostUserInfo, postUserInfo)
userRouter.get("/writings/:id", getUsersWritings)
userRouter.get("/single-writing/:id/:writingId", getUserSingleWriting)