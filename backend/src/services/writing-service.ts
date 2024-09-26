import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export interface WritingPrompt {
  writing_id: number;
  writing_prompt: {
    content: string;
    task: "letter" | "essay";
    id: number;
  };
}

export const getWritingFromWritingService = async (
  userId: string,
  taskType: "essay" | "letter"
): Promise<WritingPrompt> => {
  const body = {
    user_id: userId,
    task_type: taskType,
  };

  const response = await axios
    .post(`${process.env.ACCESS_TOKEN_SECRET}/writing`, body, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Node.js",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

export const postUserWritingToWritingService = async (
  writing: string,
  writingId: string
) => {
  const body = { writing, writingId }
  const response = await axios
    .post(`${process.env.ACCESS_TOKEN_SECRET}/writing/submit`, body, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Node.js",
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
};
