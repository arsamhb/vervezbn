import jwt from "jsonwebtoken";
require("dotenv").config();

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data: any) {
    this.users = data;
  },
};

export const handleRefreshToken = async (req: any, res: any) => {
  const { cookie } = req.cookie;
  if (!cookie?.jwt) return res.status(401);

  const foundUser = userDB.users.find(
    (user: any) => user.refreshToken === cookie.jwt
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
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
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
      
      const accessToken = jwt.sign(
        { userName: decoded.userName },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1m" }
      );
      res.json({ accessToken });
    }
  );
};
