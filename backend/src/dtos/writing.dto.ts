export interface Writing {
  id: string;
  userId: string;
  content: string;
  cueId: string;
  writingLevel: WritingLevel;
  createdAt: Date;
}

export enum WritingLevel {
  REGULAR,
  PREMIUM,
}
