const express = require("express");
const cors = require("cors");
const path = require("path");

const helmet = require("helmet");
const morgan = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");
const mw = require("./middleware/middlewares");

const server = express();

server.use(morgan("dev"));

server.use("/api/hubs", hubsRouter);

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/*", (_, res) => {
  res.json({ data: "Welcome to the Big League Socials API" });
});

module.exports = server;
