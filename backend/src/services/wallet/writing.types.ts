enum WritingType {
  academic = "academic",
  general = "general",
}

export interface writing {
  content: string;
  taskType: WritingType;
  comment: string;
  question: string;
  task_achievement_score: number;
  cohesion_cohesive_score: number;
  lexical_resource_score: number;
  grammar_range_score: number;
  overall_score: number;
}
