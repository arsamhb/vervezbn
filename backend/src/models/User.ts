import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const User = sequelize.define("user", {
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
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  wallet: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
