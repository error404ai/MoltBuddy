import { config } from "dotenv";
import { dirname, join } from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url";

// Direct entity imports for reliable bundling
import User from "./entities/User.js";

// Direct migration imports for reliable bundling
import { migrations } from "./migrations/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, "..", ".env") });

const isTsMode = __filename.endsWith(".ts");

console.log("Running in", isTsMode ? "TS" : "JS", "mode");

// All entities - direct imports work in all environments
const entities = [User];

const subscribersGlob = join(__dirname, `subscribers/*.${isTsMode ? "ts" : "js"}`);

console.log("Using direct entity and migration imports");

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "moltbuddy_db",
  logging: !isTsMode,
  synchronize: false,
  migrationsRun: true,
  entities: entities,
  migrations: migrations,
  subscribers: [subscribersGlob],
});
