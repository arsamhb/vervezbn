import { Router } from "express";
import {
  getUserInfo,
  getUserSingleWriting,
  postUserInfo,
} from "../controllers/user.controller";
import {
  validateGetUserInfo,
  validatePostUserInfo,
} from "@/middleware/validations/user-validation-middleware";
import { getUsersWritings } from "@/controllers/user.controller";

export const userRouter = Router();

/**
 * @swagger
 * /user/info/{id}:
 *   get:
 *     summary: Retrieve user information by ID
 *     description: Get detailed information of a user by their ID, including email, name, phone, and other details.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user's ID
 *                   example: "12345"
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                   example: "user@example.com"
 *                 firstName:
 *                   type: string
 *                   description: The user's first name
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   description: The user's last name
 *                   example: "Doe"
 *                 phoneNumber:
 *                   type: string
 *                   description: The user's phone number
 *                   example: "+123456789"
 *                 birthDate:
 *                   type: string
 *                   format: date
 *                   description: The user's birth date
 *                   example: "1990-01-01"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *                   example: "2022-01-01T12:00:00Z"
 *                 balance:
 *                   type: number
 *                   description: The user's account balance
 *                   example: 100.50
 *                 referralCode:
 *                   type: string
 *                   description: The user's referral code
 *                   example: "ABC123"
 *                 role:
 *                   type: string
 *                   description: The user's role in the system
 *                   example: "admin"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/info/:id", validateGetUserInfo, getUserInfo);
userRouter.post("/info/:id", validatePostUserInfo, postUserInfo);
userRouter.get("/writings/:id", getUsersWritings);
userRouter.get("/single-writing/:id/:writingId", getUserSingleWriting);
