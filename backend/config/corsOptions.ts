const whiteList = ["http://127.0.0.1:5500", "http://localhost:3500"];
export const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
