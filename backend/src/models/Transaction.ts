import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

// TRANSACTION USER_ID IS A FOREIGN KEY TO THE USER ID ***** 

const Transaction = sequelize.define("transaction", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
  },
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
  gateway: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Transaction.sync( )
  .then((data) => {
    console.log("Transaction model synced", data);
  })
  .catch((err) => {
    console.log("ERROR on transaction model", err);
  });

export { Transaction };
