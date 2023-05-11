const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join_room", (roomId) => {
    console.log(`User joined room: ${roomId}`);
    socket.join(roomId);
  });

  socket.on("leave_room", (roomId) => {
    console.log(`User left room: ${roomId}`);
    socket.leave(roomId);
  });

  socket.on("message", async ({ chatId, message }) => {
    // You can save the message to the database here if required

    // Broadcast the message to all clients in the room
    io.to(chatId).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 8090;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
