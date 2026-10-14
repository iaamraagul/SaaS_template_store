import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
export const signToken = (user) =>
  jwt.sign({ sub: user._id.toString() }, env.jwtSecret, { expiresIn: "7d" });
