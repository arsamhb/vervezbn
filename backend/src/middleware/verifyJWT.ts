import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayloadWithUsername extends jwt.JwtPayload {
  username: string;
}

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
    (
      err: jwt.VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined
    ) => {
      if (err) return res.sendStatus(500);
      const decodedPayload = decoded as JwtPayloadWithUsername;
      req.body.username = decodedPayload.username;
      next();
    }
  );
};
