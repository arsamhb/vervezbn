import { ENV } from "@/config/env.config";
import { ERRORS } from "@/constants/response.messages";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayloadWithUsername extends jwt.JwtPayload {
  username: string;
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.cookie;
  const { REFRESH_TOKEN_SECRET } = ENV;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split("=")[1];
  if (!REFRESH_TOKEN_SECRET) {
    return res.status(500).json({ message: ERRORS.ENV_VAR_NOT_FOUND });
  }

  jwt.verify(
    token,
    REFRESH_TOKEN_SECRET,
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
