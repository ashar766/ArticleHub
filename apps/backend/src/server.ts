console.log("🚀 Server file loaded");
import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/socket.js";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
