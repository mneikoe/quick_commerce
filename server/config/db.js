import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "./config.js";

dotenv.config();

export function connectToDb() {
  try {
    mongoose.connect(config.DB_URI, { serverSelectionTimeoutMS: 15000 });
    console.log(` Connected successfully to ${config.DB_URI}`);
  } catch (err) {
    console.error(" Connection to database failed", err);
    
    throw err;
  }
}
