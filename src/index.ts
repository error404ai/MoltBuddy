import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";
import { serveStatic } from "hono/serve-static";
import "reflect-metadata";
import { AppDataSource } from "./database.js";

config();

const app = new Hono();
const api = new Hono();

// Initialize database
let dbInitPromise: Promise<void> | null = null;
async function ensureDatabaseInitialized() {
  if (AppDataSource.isInitialized) return;
  if (!dbInitPromise) {
    dbInitPromise = AppDataSource.initialize()
      .then(() => console.log("✅ Database connection established"))
      .catch((err: unknown) => {
        console.error("❌ Database connection failed:", err);
      });
  }
  await dbInitPromise;
}

// Initialize on startup
ensureDatabaseInitialized();

// Health check endpoint
api.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: AppDataSource.isInitialized ? "Connected" : "Disconnected",
  });
});

// Root endpoint
api.get("/", (c) => {
  return c.json({
    message: "MoltBuddy API",
    version: "1.0.0",
    database: AppDataSource.isInitialized ? "Connected" : "Disconnected",
  });
});

app.route("/api", api);

// Serve frontend build (production)
app.use("/*", serveStatic({ root: "./public" }));

const port = parseInt(process.env.PORT || "3000", 10);

console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
