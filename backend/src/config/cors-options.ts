type Callback = (err: Error | null, allow: boolean) => void;

const whiteList = ["http://127.0.0.1:5500", "http://localhost:3500", "http://localhost:3000"];
export const corsOptions = {
  origin: (origin: string | undefined, callback: Callback) => {
    if (!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"), false);
    }
  },
  optionsSuccessStatus: 200,
};
