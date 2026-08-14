import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.PORT ||
  !process.env.MONGO_URI ||
  !process.env.SESSION_SECRET ||
  !process.env.ACCESS_TOKEN_SECRET
) {
  throw new Error("Missing required environment variables");
}
export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};
