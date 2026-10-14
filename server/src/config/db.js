import mongoose from "mongoose";
import { env } from "./env.js";
export const connectDb = (uri = env.mongoUri) => mongoose.connect(uri);
