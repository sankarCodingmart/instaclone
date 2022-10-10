import { Server } from "socket.io";
export default (server) => {
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log("user joined the room" + data);
    });
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
