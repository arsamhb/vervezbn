import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
require("dotenv").config();

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.cookie;
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split("=")[1];
  if (!process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables"
    );
    return res.sendStatus(500);
  }

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (typeof decoded !== "string" && decoded?.userName) {
        if (err) return res.sendStatus(403);
        req.body.user = decoded.userName;
        next();
      }
    }
  );
};
