import { serve } from "@hono/node-server";
import { config } from "dotenv";
import { Hono } from "hono";
import "reflect-metadata";
import { AppDataSource } from "./database.js";

// Load environment variables
config();

const app = new Hono();

// Initialize database
let dbInitPromise: Promise<void> | null = null;
async function ensureDatabaseInitialized() {
  if (AppDataSource.isInitialized) return;
  if (!dbInitPromise) {
    dbInitPromise = AppDataSource.initialize()
      .then(() => console.log("✅ Database connection established"))
      .catch((err: any) => {
        console.error("❌ Database connection failed:", err);
      });
  }
  await dbInitPromise;
}

// Initialize on startup
ensureDatabaseInitialized();

// Health check endpoint
app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    database: AppDataSource.isInitialized ? "Connected" : "Disconnected",
  });
});

// Root endpoint
app.get("/", (c) => {
  return c.json({
    message: "MoltBuddy API",
    version: "1.0.0",
    database: AppDataSource.isInitialized ? "Connected" : "Disconnected",
  });
});

const port = parseInt(process.env.PORT || "8000");

console.log(`🚀 Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
