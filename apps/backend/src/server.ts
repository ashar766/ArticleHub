import http from "http";
import app from "./app.js";
import { initSocket } from "./socket/socket.js";

const port = Number(process.env.PORT);

if (!port) {
  throw new Error("PORT environment variable is not set.");
}

const server = http.createServer(app);

initSocket(server);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on port ${port}`);
});
