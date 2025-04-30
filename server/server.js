import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import { connectToDb } from "./config/db.js";
import socketHandler from "./sockets/socketHandler.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorMiddleware.js";

import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

// Database & Socket
connectToDb();
socketHandler(io);

// Start server
const PORT = process.env.PORT || 8181;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
