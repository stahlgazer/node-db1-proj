const express = require("express");
const accountsRouter = require("../routers/accounts");
const server = express();

server.use(express.json());
server.use("/api/accounts", accountsRouter);

module.exports = server;
