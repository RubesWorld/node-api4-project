const express = require("express");
const cors = require("cors");
const path = require("path");

const helmet = require("helmet");
const morgan = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");
const mw = require("./middleware/middlewares");

const server = express();
const port = process.env.PORT || 9000;

server.use(morgan("dev"));

server.use("/api/hubs", hubsRouter);

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/*", (_, res) => {
  res.json({ data: "Welcome to the Big League Socials API" });
});

server.use("*", (_, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = server;
