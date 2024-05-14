import bcrypt from "bcrypt";

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
  const foundUser = userDB.users.find((user) => user.userName === userName);
  if (!foundUser) {
    return res.sendStatus(401);
  }

  const matchedPassword = await bcrypt.compare(password, foundUser.password);
  if (matchedPassword) {
    res.json({ success: `User ${userName} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};
