import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url"; // Added import
import { dirname } from "path"; // Added import

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rest of your imports...
import { connectToDb } from "./config/db.js";
import socketHandler from "./sockets/socketHandler.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.FRONTEND_URL } });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

// CORS middleware
app.use(cors());

// Routes
app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));

// Production static files
app.use(express.static(path.join(__dirname, "dist")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
app.use(errorHandler);

// Database & Socket
connectToDb();
socketHandler(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
