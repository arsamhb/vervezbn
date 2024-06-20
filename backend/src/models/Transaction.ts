import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Transaction = sequelize.define("transaction", {
  amount: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gateway: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Transaction.sync({ alter: true })
  .then((data) => {
    console.log("Transaction model synced", data);
  })
  .catch((err) => {
    console.log("ERROR on transaction model", err);
  });

export { Transaction };
