import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

// ASSOCIATIONS FOR WRITING SHOULD BE HANDLED *****
// Writing.belongsTo(User);

const Writing = sequelize.define("writing", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    unique: true,
  },
  content: {
    type: DataTypes.STRING,
  },
  taskType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scoreTaskAchRes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scoreCohAndCoh: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scoreLexRes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scoreTaskGramAcc: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  scoreOverall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Writing.sync()
  .then((data) => {
    console.log("Transaction model synced", data);
  })
  .catch((err) => {
    console.log("ERROR on transaction model", err);
  });

export { Writing };
