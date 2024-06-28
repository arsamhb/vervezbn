import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import {
  WritingAttributes,
  WritingCreationAttributes,
  WritingType,
} from "./writing.types";

class Writing
  extends Model<WritingAttributes, WritingCreationAttributes>
  implements WritingAttributes
{
  public id!: number;
  public taskType: WritingType;
  public question: string;
  public comment?: string;
  public content?: string;
  public task_achievement_score?: number;
  public cohesion_cohesive_score?: number;
  public lexical_resource_score?: number;
  public grammar_range_score?: number;
  public overall_score?: number;
  public user_id: string;
}

Writing.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    cohesion_cohesive_score: {
      type: DataTypes.NUMBER,
    },
    grammar_range_score: {
      type: DataTypes.NUMBER,
    },
    lexical_resource_score: {
      type: DataTypes.NUMBER,
    },
    overall_score: {
      type: DataTypes.NUMBER,
    },
    task_achievement_score: {
      type: DataTypes.NUMBER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, tableName: "writings" }
);
