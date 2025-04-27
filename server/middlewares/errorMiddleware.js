// middlewares/errorMiddleware.js
import { ErrorHandler } from "../utils/errorHandler.js";

const errorHandler = (err, req, res, next) => {
  // Ensure that the error is an instance of ErrorHandler
  if (typeof err === "string") {
    err = new ErrorHandler(err, 400); // If it's a string, convert it to a proper error handler
  }

  // Default error response setup
  err.statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  err.message = err.message || "Internal Server Error"; // Default message

  // Handle Mongoose CastError (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    err = new ErrorHandler(`Resource not found. Invalid: ${err.path}`, 400);
  }

  // Handle Mongoose Duplicate Key Error (e.g., duplicate email)
  if (err.code === 11000) {
    err = new ErrorHandler(
      `Duplicate value entered for ${Object.keys(err.keyValue).join(", ")}`,
      400
    );
  }

  // Handle invalid JWT Token Error
  if (err.name === "JsonWebTokenError") {
    err = new ErrorHandler("Invalid JSON Web Token. Please try again.", 401);
  }

  // Handle expired JWT Token Error
  if (err.name === "TokenExpiredError") {
    err = new ErrorHandler(
      "Your session has expired. Please login again.",
      401
    );
  }

  // Log operational errors
  if (err.isOperational) {
    // Log for known errors (e.g., validation, authentication errors)
    console.warn("Operational Error:", err.message);
  } else {
    // Log unexpected errors
    console.error("Unexpected Error:", err);
  }

  // Send error response to the client
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : null, // Optional stack trace in development
  });
};

export default errorHandler;
