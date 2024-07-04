import bcrypt from "bcrypt";
import {
  findUserByEmail,
  registerNewUser,
} from "@/repositories/user.repository";
import { Request, Response } from "express";

export const handleNewUser = async (req: Request, res: Response) => {
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

  registerNewUser(email, hashedPassword)
    .then((data) => {
      res
        .status(201)
        .json({ success: `New user with ${data.email} mail created!` });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error -> ${err}` });
    });
};
