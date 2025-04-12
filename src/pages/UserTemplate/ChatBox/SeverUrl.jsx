import { io } from "socket.io-client";

export const socket = io("https://chatbox-production-b96f.up.railway.app", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  autoConnect: true,
});
