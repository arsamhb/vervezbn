import axios from "axios";

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
) => {
  const body = {
    user_id: userId,
    task_type: taskType,
  };

  const response = await axios
    .post("http://writing-service/writing", body, {
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
  const body = {
    writing_id: parseInt(writingId, 10),
    writing,
  };

  const response = await axios
    .post("http://writing-service/writing", body, {
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
