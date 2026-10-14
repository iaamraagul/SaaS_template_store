import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";
export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : null;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Authentication required." });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.user = await User.findById(payload.sub);
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists." });
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
}
