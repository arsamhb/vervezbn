import { Router } from "express";
import { getWriting, submitWriting } from "../controllers/writing.controller";
import {
  validateGetWriting,
  validateSubmitWriting,
} from "@/middleware/validations/writing-validation-middleware";

export const writingRouter = Router();

/**
 * @swagger
 * /writing/{id}:
 *   get:
 *     summary: Retrieve a writing task for a user
 *     description: Fetches a writing task (essay or letter) for a specific user by their ID.
 *     tags:
 *       - Writing
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [essay, letter]
 *         description: The type of the writing task, can be either 'essay' or 'letter'
 *     responses:
 *       200:
 *         description: Successfully retrieved the writing task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cueCard:
 *                   type: string
 *                   description: The content of the writing task's cue card
 *                   example: "Write about a time when you overcame a challenge."
 *                 taskType:
 *                   type: string
 *                   description: The type of the task (essay or letter)
 *                   example: "essay"
 *                 cueId:
 *                   type: string
 *                   description: The ID of the cue card
 *                   example: "cue123"
 *       400:
 *         description: Bad Request. The user ID or task type is missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "user id should be provided"
 *       500:
 *         description: Internal Server Error. Something went wrong.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
writingRouter.get("/:id", validateGetWriting, getWriting);

/**
 * @swagger
 * /writing/{id}:
 *   post:
 *     summary: Submit a user's writing
 *     description: Allows a user to submit a piece of writing using their user ID. Requires a valid user balance and returns the writing submission response.
 *     tags:
 *       - Writing
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       description: The writing submission details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - writingId
 *               - writing
 *             properties:
 *               writingId:
 *                 type: string
 *                 description: The ID of the writing to submit
 *                 example: "writing123"
 *               writing:
 *                 type: string
 *                 description: The actual writing content
 *                 example: "This is the content of the writing."
 *     responses:
 *       200:
 *         description: Successfully submitted the writing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Writing submitted successfully."
 *                 data:
 *                   type: object
 *                   description: The response from the writing service.
 *                   example: { "writingServiceId": "abcd1234", "status": "submitted" }
 *       400:
 *         description: Invalid request or insufficient balance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Not enough coins"
 *       401:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error or missing environment variable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */
writingRouter.post("/:id", validateSubmitWriting, submitWriting);
