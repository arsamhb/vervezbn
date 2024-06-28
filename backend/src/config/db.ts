import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.HOST as string,
    port: parseInt(process.env.PORT as string),
    dialect: "postgres",
  }
);

export async function testDbConnection() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
      process.exit(1);
    });
}
