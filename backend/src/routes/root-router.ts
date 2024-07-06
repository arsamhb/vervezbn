import express from "express";

export const rootRouter = express.Router();

rootRouter.get("^/$|/index(.html)?", (req, res) => {
  res.sendStatus(200);
});

