import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Response, Request } from "express";

export const handleRefreshToken = async (req: Request, res: Response) => {
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
