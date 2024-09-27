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
 *     tags:
 *       - User
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

/**
 * @swagger
 * /user/info/{id}:
 *   post:
 *     summary: Update user information by ID
 *     description: Update a user's details like first name, last name, phone number, and birth date. Some fields are optional.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: User's first name (optional)
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: User's last name (optional)
 *                 example: "Doe"
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number, must be 12 digits (optional)
 *                 example: "123456789012"
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *                 description: User's birth date (optional)
 *                 example: "1990-01-01T00:00:00Z"
 *     responses:
 *       200:
 *         description: Successfully updated user information.
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
 *                   example: "123456789012"
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                   description: The user's birth date
 *                   example: "1990-01-01T00:00:00Z"
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
 *                   example: "user"
 *       400:
 *         description: Invalid input, validation failed.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/info/:id", validatePostUserInfo, postUserInfo);

/**
 * @swagger
 * /user/writings/{id}:
 *   get:
 *     summary: Retrieve a user's writings
 *     description: Get a paginated list of writings for a user by their ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *       - in: query
 *         name: skip
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of records to skip for pagination (default is 0).
 *         example: 0
 *       - in: query
 *         name: take
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of records to take for pagination (default is 10).
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved user's writings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The writing's unique ID
 *                         example: "abc123"
 *                       writingType:
 *                         type: string
 *                         description: Type of writing
 *                         example: "Essay"
 *                       commentLevel:
 *                         type: string
 *                         description: The level of comment provided for the writing
 *                         example: "High"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: When the writing was created
 *                         example: "2024-09-15T12:34:56Z"
 *                       examType:
 *                         type: string
 *                         description: Type of exam associated with the writing
 *                         example: "IELTS"
 *                       cueCard:
 *                         type: string
 *                         description: The cue card used in the exam
 *                         example: "Describe a place you like"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/writings/:id", getUsersWritings);

/**
 * @swagger
 * /user/single-writing/{id}/{writingId}:
 *   get:
 *     summary: Retrieve a single writing by user ID and writing ID
 *     description: Get detailed information about a single writing based on user ID and writing ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: path
 *         name: writingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The writing ID
 *     responses:
 *       200:
 *         description: Successfully retrieved writing information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the writing
 *                       example: "abc123"
 *                     cueCard:
 *                       type: string
 *                       description: The cue card related to the writing
 *                       example: "Cue Card Example"
 *                     userId:
 *                       type: string
 *                       description: The user ID who owns the writing
 *                       example: "user456"
 *                     content:
 *                       type: string
 *                       description: The content of the writing
 *                       example: "This is the writing content..."
 *                     cueId:
 *                       type: string
 *                       description: The ID of the cue related to the writing
 *                       example: "cue789"
 *                     writingType:
 *                       type: string
 *                       description: The type of the writing
 *                       example: "essay"
 *                     examType:
 *                       type: string
 *                       description: The type of exam the writing belongs to
 *                       example: "IELTS"
 *                     commentLevel:
 *                       type: string
 *                       description: The comment level on the writing
 *                       example: "high"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The creation date of the writing
 *                       example: "2024-09-26T12:34:56Z"
 *       403:
 *         description: The user does not have access to the requested writing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You do not have access to this writing"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "We did not find the user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "internal server error"
 */
userRouter.get("/single-writing/:id/:writingId", getUserSingleWriting);
