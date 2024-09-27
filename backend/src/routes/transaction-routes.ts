import { Router } from "express";
import {
  chargeWallet,
  getUserBankTransactions,
  getUserAppTransactions,
} from "../controllers/transaction.controller";
import { validateTransactionCharge } from "@/middleware/validations/transaction-validation-middleware";

export const transactionRouter = Router();

/**
 * @swagger
 * /transaction/charge-wallet:
 *   post:
 *     summary: Charge a user's wallet
 *     description: Adds coins to the user's wallet based on the amount provided in Rials.
 *     tags:
 *       - Transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the user whose wallet is to be charged
 *                 example: "12345"
 *               amount:
 *                 type: number
 *                 description: The amount in Rials to be converted to coins and added to the wallet
 *                 example: 100000
 *             required:
 *               - id
 *               - amount
 *     responses:
 *       200:
 *         description: Coins successfully added to the user's wallet.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Coins added successfully"
 *       400:
 *         description: Invalid request. This occurs when validation fails, e.g., incorrect amount or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       path:
 *                         type: string
 *                         description: The field that caused the validation error
 *                         example: "amount"
 *                       message:
 *                         type: string
 *                         description: The validation error message
 *                         example: "Amount must be a multiple of 1000"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "We did not found the user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
transactionRouter.post(
  "/charge-wallet",
  validateTransactionCharge,
  chargeWallet
);

/**
 * @swagger
 * /transaction/{userId}/bankTransactions:
 *   get:
 *     summary: Get bank transactions for a user
 *     description: Retrieve a paginated list of bank transactions for a specific user by userId.
 *     tags:
 *       - Transaction
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose transactions are being requested.
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: The number of transactions to skip for pagination.
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of transactions to return.
 *     responses:
 *       200:
 *         description: Successfully retrieved bank transactions.
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
 *                         description: The transaction ID.
 *                         example: "txn_12345"
 *                       amount:
 *                         type: number
 *                         description: The transaction amount.
 *                         example: 250.75
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time of the transaction.
 *                         example: "2023-09-27T12:34:56Z"
 *                       type:
 *                         type: string
 *                         description: The type of transaction.
 *                         example: "REMOTE"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
transactionRouter.get("/:userId/bankTransactions", getUserBankTransactions);

/**
 * @swagger
 * /transaction/{userId}/appTransactions:
 *   get:
 *     summary: Retrieve app transactions for a user
 *     description: Get a paginated list of transactions for a specific user by their ID. Transactions are filtered for type 'LOCAL'.
 *     tags:
 *       - Transaction
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of records to skip for pagination
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records to return for pagination
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's transactions.
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
 *                         description: The transaction ID
 *                         example: "abc123"
 *                       amount:
 *                         type: number
 *                         description: The transaction amount
 *                         example: 100.5
 *                       type:
 *                         type: string
 *                         description: The type of transaction (e.g., 'LOCAL')
 *                         example: "LOCAL"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date of the transaction
 *                         example: "2024-09-15T14:30:00Z"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "We did not find the user."
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
transactionRouter.get("/:userId/appTransactions", getUserAppTransactions);
