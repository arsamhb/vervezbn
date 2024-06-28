import {
  TransactionAttributes,
  TransactionCreationAttributes,
  TransactionStatus,
} from "./transaction.types";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number;
  public amount: number;
  public user_id: number;
  public status: TransactionStatus;
  public gateway: string;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gateway: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "transactions",
  }
);

Transaction.sync({ alter: true })
  .then((data) => {
    console.log("Transaction table synced", data);
  })
  .catch((err) => {
    console.log("ERROR on transaction model", err);
  });

export { Transaction };
