import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { User } from "../types/user";
// import * as dotenv from "dotenv";
import { Response, Request } from "express";

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data: Array<User>) {
    this.users = data;
  },
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const { cookie } = req.cookies;
  if (!cookie?.jwt) return res.status(401);

  const foundUser = userDB.users.find(
    (user: User) => user.refreshToken === cookie.jwt
  );
  if (!foundUser) return res.sendStatus(403);

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
    return res.sendStatus(500);
  }

  jwt.verify(
    cookie.jwt,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.sendStatus(403);

      if (
        !process.env.ACCESS_TOKEN_SECRET ||
        !process.env.REFRESH_TOKEN_SECRET
      ) {
        console.error(
          "ACCESS_TOKEN_SECRET is not defined in environment variables"
        );
        return res.sendStatus(500);
      }

      if (typeof decoded !== "string" && decoded?.userName) {
        const accessToken = jwt.sign(
          { userName: decoded.userName },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "1m" }
        );
        res.json({ accessToken });
      } else {
        res.sendStatus(500);
      }
    }
  );
};
