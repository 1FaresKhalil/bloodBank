const { createServer } = require("http");
const { Server } = require("socket.io");
const { Server: NetServer } = require("net");
const express = require("express");

module.exports = async (req, res) => {
  if (req.method === "OPTIONS") {
    // Handle CORS preflight request
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    path: "/api/socket",
  });

  // Your existing socket event listeners go here
  io.on("connection", (socket) => {
    // ...
  });

  const netServer = new NetServer((socket) => {
    server.emit("connection", socket);
  });

  await new Promise((resolve) => {
    netServer.once("listening", resolve);
    netServer.listen(0);
  });

  const { port } = netServer.address();
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json({ port });
  netServer.close();
};
