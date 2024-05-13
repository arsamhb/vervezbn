import path from "path";
import express from "express";
import { logger } from "./middleware/loggers";

const app = express();
const PORT = process.env.PORT || 3500;

// CUSTOM LOGGER MIDDLEWARE
app.use(logger);

// BUILT-IN MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.get("/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
