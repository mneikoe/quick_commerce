import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const config = {
  PORT: process.env.PORT || 8181, // Default to 8181 if not set
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*", // Default to all origins if not set
  BUCKET_NAME: process.env.BUCKET_NAME,
};

if (!config.DB_URI || !config.JWT_SECRET) {
  console.error("Missing required environment variables.");
  process.exit(1); // Exit the application if required variables are missing
}

export default config;
