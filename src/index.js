import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const EVENT_NAME = {
  CHAT_MESSAGE: "CHAT_MESSAGE",
  TYPING: "TYPING",
};

io.on("connection", (socket) => {
  socket.on(EVENT_NAME.TYPING, (typing) => {
    io.emit(EVENT_NAME.TYPING, {
      ...typing,
      time: new Date(),
    });
  });

  socket.on(EVENT_NAME.CHAT_MESSAGE, (dataMessage) => {
    io.emit(EVENT_NAME.CHAT_MESSAGE, {
      ...dataMessage,
      time: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
