export interface writingScore {
  taskAchievementResponse: number;
  CohAndCoh: number;
  LexicalResource: number;
  gramRangeAccuracy: number;
  overallScore: number;
}

export interface writing {
  content: string;
  taskType: "academic" | "general";
  score: writingScore;
  comment: string;
  question: string;
}
