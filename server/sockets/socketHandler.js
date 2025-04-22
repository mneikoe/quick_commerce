module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinOrderRoom", (orderId) => {
      socket.join(orderId);
      console.log(`User ${socket.id} joined order room ${orderId}`);
    });

    socket.on("updateLocation", (data) => {
      io.to(data.orderId).emit("locationUpdate", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
