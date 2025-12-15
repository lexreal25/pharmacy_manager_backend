import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();


export const SessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  autoRemove:"native",
});
