import path from "path";
import express from "express";
import { logger } from "./middleware/loggers";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";
import { corsOptions } from "./config/corsOptions";
import { verifyJWT } from "./middleware/verifyJWT";
import cookieParser from "cookie-parser";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3500;

// CUSTOM LOGGER MIDDLEWARE
app.use(logger);

// CORS
app.use(cors(corsOptions));

// BUILT-IN MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// STATIC FILE SERVING MIDDLEWARE
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

// ROUTING BETWEEN ROUTES
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/subdir", require("./routes/subdir"));

// PROTECTING API ROUTES BY THE VERIFY JWT MIDDLEWARE
app.use(verifyJWT);
// SAMPLE API
app.use("/users", require("./routes/api/users"));

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
