const data = {
  users: require("../models/data.json"),
  setUsers: function (data: any) {
    this.users = data;
  },
};

export const getAllUsers = (req: any, res: any) => {
  res.json(data.users);
};

export const createUser = (req: any, res: any) => {
  const newUser = { firstName: "", lastName: "", id: -1 };
  if (req.body.firstName && req.body.lastName) {
    newUser.id = data.users?.length
      ? data.users[data.users.length - 1].id + 1
      : 1;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
  } else {
    return res
      .status(400)
      .json({ message: "First and last names are required" });
  }
  data.setUsers([...data.users, newUser]);
  res.status(201).json({ message: `user created with ${newUser.id} id` });
};

export const updateUser = (req: any, res: any) => {
  let user = data.users.find((user: any) => user.id === parseInt(req.body.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User with ${req.body.id} id not found` });
  }
  if (req.body.firstName) user.firstName = req.body.firstName;
  if (req.body.lastName) user.lastName = req.body.lastName;
  const filteredUsers = data.users.filter(
    (user: any) => user.id !== parseInt(req.body.id)
  );
  const unsortedUsers = [...filteredUsers, user];
  console.log(unsortedUsers);

  data.setUsers(
    unsortedUsers.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json({ message: `User with ${user.id} updated` });
};

export const deleteUser = (req: any, res: any) => {
  const userToDelete = data.users.find(
    (user: any) => user.id === parseInt(req.body.id)
  );
  if (!userToDelete) {
    return res
      .status(400)
      .json({ message: `User with ${req.body.id} not found` });
  }
  data.setUsers(
    data.users.filter((user: any) => user.id !== parseInt(req.body.id))
  );
  res.json({ message: `User with ${req.body.id} deleted` });
};

export const getOneUser = (req: any, res: any) => {
  let user = data.users.find((user: any) => user.id === parseInt(req.user.id));
  if (!user) {
    return res
      .status(400)
      .json({ message: `User with ${req.body.id} not found` });
  }
  res.json(user);
};
