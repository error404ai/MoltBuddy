import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import fs from "node:fs";
import http from "http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import "reflect-metadata";

import type { IocAdapter } from "routing-controllers";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { AppDataSource } from "./loaders/database";
import Logger from "./logger/index";
import { GlobalErrorHandler } from "./middleware/errorHandler.middleware";
import { requestContextMiddleware } from "./middleware/requestContext";

// Controllers
import { HealthController } from "./controllers/HealthController";
import { UserController } from "./controllers/UserController";

import { authorizationChecker, currentUserChecker } from "./middleware/authChecker";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

class TypeDIAdapter implements IocAdapter {
  get<T>(someClass: { new (...args: any[]): T }): T {
    return Container.get<T>(someClass);
  }
}

useContainer(new TypeDIAdapter());

const app: express.Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(requestContextMiddleware);

useExpressServer(app, {
  routePrefix: "/api",
  controllers: [HealthController, UserController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
  },
  classTransformer: true,
  cors: {
    origin: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  },
  authorizationChecker,
  currentUserChecker,
});

// Serve frontend static files
const publicDir = join(__dirname, "..", "public");
const indexHtml = join(publicDir, "index.html");
app.use(express.static(publicDir));

// Catch-all route for SPA
app.get("*", (req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ message: "API endpoint not found" });
  }

  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }

  // In development, frontend is served by Vite on port 5173
  if (process.env.NODE_ENV === "development") {
    return res.redirect(`http://localhost:5173${req.originalUrl}`);
  }

  return res.status(404).json({ message: "Frontend not built. Run: pnpm run build:frontend" });
});

const server = http.createServer(app);

AppDataSource.initialize()
  .then(async () => {
    Logger.info("Database connected successfully");

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      Logger.info(`🚀 Server is running on http://localhost:${PORT}`);
      Logger.info(`📚 API is available at http://localhost:${PORT}/api`);
    });
  })
  .catch((error: unknown) => {
    Logger.error("Failed to initialize database:", error);
    process.exit(1);
  });

export default app;
