import { Optional } from "sequelize";

export enum WritingType {
  academic = "academic",
  general = "general",
}

export interface WritingAttributes {
  id: number;
  taskType: WritingType;
  question: string;
  content?: string;
  comment?: string;
  task_achievement_score?: number;
  cohesion_cohesive_score?: number;
  lexical_resource_score?: number;
  grammar_range_score?: number;
  overall_score?: number;
  user_id: string;
}

export interface WritingCreationAttributes
  extends Optional<WritingAttributes, "id"> {}
