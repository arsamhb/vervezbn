/* eslint-disable-next-line padded-blocks */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import {
  findUserByEmail,
  registerNewUser,
} from "../repositories/user.repository";
import { generateReferralCode } from "../utils/generate-referral-code"

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const foundUser = await findUserByEmail(email);

  if (!foundUser)
    return res
      .status(401)
      .json({ message: "We did not find any user with this username." });

  const matchedPassword = await bcrypt.compare(password, foundUser.password);

  if (!matchedPassword)
    return res.status(401).json({ message: "Password is not correct." });

  // convert it to a util called env variable guard
  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables",
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET
    );
    return res
      .status(500)
      .json({ message: "Something really bad happen. Visit us later." });
  }

  const accessToken = jwt.sign(
    { email: foundUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
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
    return res.status(204).json({ message: "No cookie or token provided" });

  if (!process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables",
      process.env.REFRESH_TOKEN_SECRET
    );
    return res
      .status(500)
      .json({ message: "Something really bad happen. Visit us later." });
  }

  res.clearCookie("jwt", { httpOnly: true });
  return res.status(204).json({ message: "Logged out" });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { cookie } = req.cookies;
  if (!cookie?.jwt) return res.status(401);

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables",
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET
    );
    return res
      .status(500)
      .json({ message: "Something really bad happen. Visit us later." });
  }

  jwt.verify(
    cookie.jwt,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.sendStatus(403);

      if (typeof decoded !== "string" && decoded?.email) {
        const refreshToken = jwt.sign(
          { email: decoded.email },
          process.env.REFRESH_TOKEN_SECRET as string,
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

export const newUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are not provided." });

  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({
      message: "Username and password are not in appropriate format.",
    });

  const duplicate = await findUserByEmail(email);

  if (duplicate)
    return res
      .status(409)
      .json({ message: "A user with this email already exist" });

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const referralCode = await generateReferralCode()
    const createdUser = await registerNewUser(email, hashedPassword, referralCode);
    res.status(201).json({
      success: `New user with ${createdUser.email} created.`,
    });
  } catch (error) {
    res.status(500).json({ message: `Error -> ${error}` });
  }
};
