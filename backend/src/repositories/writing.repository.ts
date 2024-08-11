import prisma from "../database/prisma-client";
import { WritingPrompt } from "../services/writing-service";

export const assignWritingToUser = async (
  userId: string,
  writing: WritingPrompt
) => {
  return prisma.writing.create({
    data: {
      userId,
      content: writing.writing_prompt.content,
      cueId: writing.writing_id.toString(),
      writingType: writing.writing_prompt.task,
      writingLevel: "REGULAR",
    },
  });
};
