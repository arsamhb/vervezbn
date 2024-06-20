import { Sequelize } from "sequelize";
export const sequelize = new Sequelize("verve", "postgres", "arsamsql4", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

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

