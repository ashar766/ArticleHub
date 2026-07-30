import { Server } from "socket.io";
let io;
const onlineUsers = new Map();
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        socket.on("register", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log("Online user:", userId);
        });
        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log("User disconnected:", userId);
                }
            }
        });
    });
    return io;
};
export const sendNotification = (userId, notification) => {
    const socketId = onlineUsers.get(userId);
    console.log("Sending notification to:", userId);
    console.log("Socket found:", socketId);
    if (socketId) {
        io.to(socketId).emit("notification", notification);
        return true;
    }
    console.log("User not online, notification not sent");
    return false;
};
