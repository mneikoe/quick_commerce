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

import router from "./routes/index.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Start server
const port = process.env.PORT || 5000;
server.listen(port, "0.0.0.0", () =>
  console.log(`Server running on port ${port}`)
);
