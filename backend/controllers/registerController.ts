const userDB = {
  users: require("../models/users.json"),
  setUsers: function (data: any) {
    this.users = data;
  },
};
import fsPromises from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

export const handleNewUser = async (req: any, res: any) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  const duplicate = userDB.users.find(
    (user: any) => user.userName === userName
  );
  if (duplicate) {
    return res.sendStatus(409);
  }
  try {
    const hashedPwd = bcrypt.hash(password, 10);

    const newUser = { userName: userName, password: hashedPwd };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "users.json"),
      JSON.stringify(userDB.users)
    );
    console.log("New user created:", newUser);
    res.status(201).json({ success: `New user ${userName} created` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
