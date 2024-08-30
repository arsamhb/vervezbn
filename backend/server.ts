import "module-alias/register";
import express from "express";
import { logger } from "./src/middleware/loggers";
import cors from "cors";
import { errorHandler } from "./src/middleware/error-handler";
import { corsOptions } from "./src/config/cors-options";
import cookieParser from "cookie-parser";
import { ENV } from "@/config/env.config";
import { router } from "@/routes";

const app = express();
const { PORT } = ENV;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

router(app);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
