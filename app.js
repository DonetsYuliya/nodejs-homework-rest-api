const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const usersRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const { message = "Server error" } = err;
  res.status(statusCode).json({ message });
});

module.exports = app;
