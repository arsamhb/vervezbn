import prisma from "../database/prisma-client";
import { WritingPrompt } from "../services/writing-service";

export const assignWritingToUser = async (
  userId: string,
  writing: WritingPrompt
) => {
  return prisma.writing.create({
    data: {
      userId,
      cueCard: writing.writing_prompt.content,
      cueId: writing.writing_id.toString(),
      commentLevel: "FREE",
      examType: "GENERAL",
      writingType: writing.writing_prompt.task === "essay" ? "ESSAY" : "LETTER",
    },
  });
};


export const findUsersWriting = async (userId: string, skip: number, take: number) => {
  return prisma.writing.findMany({
    where: {
      userId
    },
    select: {
      writingType: true,
      commentLevel: true,
      createdAt: true,
      examType: true,
      cueCard: true,
      id: true,
    },
    skip, take
  })
}

export const findOneUsersWriting = async (writingId: string) => {
  return prisma.writing.findFirst({
    where: {
      id: writingId
    }
  })
}