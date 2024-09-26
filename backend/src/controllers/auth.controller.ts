/* eslint-disable-next-line padded-blocks */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import {
  findUserByEmail,
  registerNewUser,
} from "../repositories/user.repository";
import { generateReferralCode } from "./utils/generate-referral-code";
import { ENV } from "@/config/env.config";
import { ERRORS } from "@/constants/response.messages";

dotenv.config();

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = ENV;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await findUserByEmail(email);

  if (!foundUser)
    return res.status(401).json({ message: ERRORS.USER_NOT_FOUND });

  const matchedPassword = await bcrypt.compare(password, foundUser.password);

  if (!matchedPassword)
    return res.status(401).json({ message: ERRORS.INCORRECT_PASSWORD });

  const accessToken = jwt.sign(
    { email: foundUser.email },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const cookie = req.cookies;

  if (!cookie.jwt)
    return res.status(204).json({ message: ERRORS.COOKIE_NOT_FOUND });

  if (REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ message: ERRORS.ENV_VAR_NOT_FOUND });
  }

  res.clearCookie("jwt", { httpOnly: true });
  return res.status(204).json({ message: "Logged out" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { cookie } = req.cookies;
  if (!cookie?.jwt) return res.status(401);

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ message: ERRORS.ENV_VAR_NOT_FOUND });
  }

  jwt.verify(
    cookie.jwt,
    REFRESH_TOKEN_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.sendStatus(403);

      if (typeof decoded !== "string" && decoded?.email) {
        const refreshToken = jwt.sign(
          { email: decoded.email },
          REFRESH_TOKEN_SECRET as string,
          { expiresIn: "1d" }
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
      } else {
        res.sendStatus(500);
      }
    }
  );
};

export const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const duplicate = await findUserByEmail(email);

  if (duplicate)
    return res.status(409).json({ message: ERRORS.DUPLICATE_USER });

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const referralCode = await generateReferralCode();
    const createdUser = await registerNewUser(
      email,
      hashedPassword,
      referralCode
    );
    res.status(201).json({
      success: `New user with ${createdUser.email} created.`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `${ERRORS.INTERNAL_ERROR} Error: ${error}` });
  }
};
