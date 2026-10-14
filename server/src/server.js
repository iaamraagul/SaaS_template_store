import app from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
connectDb()
  .then(() =>
    app.listen(env.port, () =>
      console.log(`API listening on http://localhost:${env.port}`),
    ),
  )
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
