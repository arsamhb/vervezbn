import {  WritingLevel } from "@prisma/client";
import prisma from "../database/prisma-client";

export interface IWritingData {
  userId: string;
  content: string;
  cueId: string;
  writingLevel: WritingLevel;
}

export const createWriting = async (writingData: IWritingData) => {
  return await prisma.writing.create({ data: writingData });
};
