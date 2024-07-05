/* eslint-disable-next-line padded-blocks */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { findUserByEmail } from "../../repositories/user-repository";

dotenv.config();

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are not provided." });

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
