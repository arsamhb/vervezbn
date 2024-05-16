/* eslint-disable-next-line padded-blocks */

import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import fsPromises from "fs/promises";
import path from "path";

// require("dotenv").config();

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data: any) {
    this.users = data;
  },
};

export const handleLogin = async (req: any, res: any) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const foundUser = userDB.users.find(
    (user: any) => user.userName === userName
  );

  if (!foundUser) {
    return res.sendStatus(401);
  }

  if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables",
      process.env.ACCESS_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_SECRET
    );
    return res.sendStatus(500);
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  
  if (matchedPassword) {
    const accessToken = jwt.sign(
      { username: foundUser.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const otherUsers = userDB.users.filter(
      (user: any) => user.userName !== foundUser.userName
    );
    const authorizedUser = { ...foundUser, refreshToken };
    userDB.setUsers([...otherUsers, authorizedUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
