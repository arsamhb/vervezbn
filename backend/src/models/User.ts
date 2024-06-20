import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { UserAttributes } from "../types/user";

const User = sequelize.define<Model<UserAttributes>>("user", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

User.sync()
  .then((data) => {
    console.log("User model synced", data);
  })
  .catch((err) => {
    console.log("ERROR on user model", err);
  });

export { User };
