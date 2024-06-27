import { Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();

export const handleLogout = async (req: Request, res: Response) => {
  const { cookie } = req.cookies;
  if (!cookie?.jwt)
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
