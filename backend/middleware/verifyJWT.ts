import jwt from "jsonwebtoken";
require("dotenv").config();

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.cookie;
  if (!authHeader) {
    return res.sendStatus(401);
  }
  const token = authHeader.split("=")[1];
  if (!process.env.REFRESH_TOKEN_SECRET) {
    console.error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables"
    );
    return res.sendStatus(500);
  }

  jwt.verify(
    token,
    process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      console.log("tokentokentoken", token);
      console.log("errerrerr",err);
      
      if (err) return res.sendStatus(403);
      req.user = decoded.userName;
      next();
    }
  );
};
