import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.js";
import templateRoutes from "./routes/templates.js";
import favoriteRoutes from "./routes/favorites.js";
const app = express();
const allowedOrigins = new Set([
  env.clientUrl,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
]);
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS."));
    },
  }),
);
app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (_req, res) =>
  res.json({ success: true, status: "ok" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Route not found." }),
);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message:
      env.nodeEnv === "production" ? "Something went wrong." : err.message,
  });
});
export default app;
