import bcrypt from "bcrypt";
import { User } from "../user.model";
import { Request, Response } from "express";

export const handleNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are not provided." });

  if (typeof username !== "string" || typeof password !== "string")
    return res.status(400).json({
      message: "Username and password are not in appropriate format.",
    });

  const duplicate = await User.findOne({
    where: {
      user_name: username,
    },
  });

  if (duplicate)
    return res
      .status(409)
      .json({ message: "A user with this email already exist" });

  const hashedPassword = await bcrypt.hash(password, 12);
  console.log("HASHED PASSWORD - >>>>>>>> ", hashedPassword);

  User.create({
    user_name: username,
    password: hashedPassword,
  })
    .then((data) => {
      console.log(data.toJSON().user_name);
      res
        .status(201)
        .json({ success: `New user ${data.toJSON().user_name} created!` });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error -> ${err}` });
    });
};
