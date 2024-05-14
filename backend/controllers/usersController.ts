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
  res.json(req.body);
};

export const updateUser = (req: any, res: any) => {
  res.json(req.body);
};

export const deleteUser = (req: any, res: any) => {
  res.json(req.body);
};

export const getOneUser = (req: any, res: any) => {
  res.json({ id: req.params.id });
};
