import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 8181,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  BUCKET_NAME: process.env.BUCKET_NAME,
};

if (!config.DB_URI || !config.JWT_SECRET) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

export default config;
