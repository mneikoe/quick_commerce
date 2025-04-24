import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectToDb } from "./config/db.js";

import socketHandler from "./sockets/socketHandler.js";
// import { ErrorHandler } from "./middlewares/errorMiddleware.js";
import router from "./routes/index.js";
// import {ErrorHandler}  from "./utils/errorHandler.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import { ErrorHandler } from "./utils/errorHandler.js";
import cors from "cors"; // ⬅️ ADD THIS

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // only if using cookies/auth
  })
);

// Routes
app.use("/api/v1", router);

// Error handling middleware
// app.use(ErrorHandler);
app.use(errorHandler);
// 404 Error handling for undefined routes
// Database & Socket
connectToDb();
socketHandler(io);

// Start server
const PORT = process.env.PORT || 8181;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
