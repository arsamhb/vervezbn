import express from "express";
import {
  signUp,
  refreshToken,
  logout,
  login,
} from "../controllers/auth.controller";

import {
  validateLogin,
  validateSignUp,
} from "@/middleware/validations/auth-validation-middleware";

export const authRouter = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user by email and password. Returns an access token and sets a refresh token in an HTTP-only cookie.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully authenticated. Returns an access token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: The JWT access token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5..."
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found or Incorrect password"
 *       500:
 *         description: Internal server error.
 */
authRouter.post("/login", validateLogin, login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with an email and password. Returns success on registration or error if the user already exists.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password (minimum 3 characters)
 *                 example: "pass123"
 *     responses:
 *       201:
 *         description: Successfully registered the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Success message after user registration
 *                   example: "New user with user@example.com created."
 *       409:
 *         description: Conflict. The user with this email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating a duplicate user
 *                   example: "Duplicate user"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message in case of an internal server issue
 *                   example: "Internal error occurred. Error: <error details>"
 */
authRouter.post("/register", validateSignUp, signUp);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the user
 *     description: Clears the JWT token from cookies and logs the user out.
 *     tags:
 *       - Auth
 *     responses:
 *       204:
 *         description: Successfully logged out or JWT token not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out"
 *       500:
 *         description: Missing environment variables like `REFRESH_TOKEN_SECRET`.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Environment variable not found"
 */
authRouter.post("/logout", logout);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh JWT Token
 *     description: This endpoint refreshes the JWT token by using the refresh token stored in the user's cookie. A new refresh token is issued if the current refresh token is valid.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Successfully refreshed token. A new JWT refresh token is set in the cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Token refreshed successfully"
 *       401:
 *         description: Unauthorized - No refresh token found in cookie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Unauthorized access
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - Invalid refresh token or token has expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Forbidden error message
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Internal Server Error - Issue with the server or environment variables.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Server error"
 */
authRouter.post("/refresh", refreshToken);
