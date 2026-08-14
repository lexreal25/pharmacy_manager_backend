import MongoStore from "connect-mongo";
import { env } from "../config/env.js";

export const SessionStore = MongoStore.create({
  mongoUrl: env.MONGO_URI,
  collectionName: "sessions",
});