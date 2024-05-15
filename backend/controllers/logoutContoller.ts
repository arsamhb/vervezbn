import jwt from "jsonwebtoken";
require("dotenv").config();
import fsPromises from "fs/promises";
import path from "path";

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data: any) {
    this.users = data;
  },
};

export const handleLogout = async (req: any, res: any) => {
  const { cookie } = req.cookie;
  if (!cookie?.jwt) return res.status(204); // NO CONTENT
  const refreshToken = cookie.jwt;

  // IS REFRESH TOKEN IN DB?
  const foundUser = userDB.users.find(
    (user: any) => user.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables"
    );
    return res.sendStatus(500);
  }

  // DELETE THE REFRESH TOKEN IN THE DB
  const otherUsers = userDB.users.filter(
    (user: any) => user.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  userDB.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); //secure: true ONLY ON HTTPS SERVER
  res.sendStatus(204)
};
