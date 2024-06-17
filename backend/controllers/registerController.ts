import fsPromises from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { User } from "../types/user";
import { Request, Response } from "express";

const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data: Array<User>) {
    this.users = data;
  },
};

export interface Error {
  message: string;
}

export const handleNewUser = async (req: Request, res: Response) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const duplicate = userDB.users.find(
    (user: User) => user.userName === userName
  );
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = { userName: userName, password: hashedPwd };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log("New user created:", newUser);
    res.status(201).json({ success: `New user ${userName} created` });
    // eslint-disable-next-line
  } catch (err: any) {
    res.status(500).json({ message: err?.message });
  }
};
