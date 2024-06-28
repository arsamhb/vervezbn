import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import { UserAttributes, UserCreationAttributes } from "./user.types";
import { Transaction } from "@/models/transaction";

// THE ASSOCIATIONS FOR USERS SHOULD BE HANDLED *****
//
// User.hasMany(Writings)

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public user_name!: string;
  public password!: string;
  public first_name?: string;
  public last_name?: string;
  public phone_number?: string;
  public birth_date?: Date;
  public wallet?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    wallet: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.hasMany(Transaction);

User.sync({ alter: true })
  .then((data) => {
    console.log("User model synced", data);
  })
  .catch((err) => {
    console.log("ERROR on user model", err);
  });

export { User };
