import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import "reflect-metadata";
import { DataSource } from "typeorm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const isTsMode = __filename.endsWith(".ts");
const fileExtension = isTsMode ? "ts" : "js";

const entitiesGlob = join(__dirname, "..", "entities", "**", `*.${fileExtension}`);
const migrationsGlob = join(__dirname, "..", "migrations", "**", `*.${fileExtension}`);
const subscribersGlob = join(__dirname, "..", "subscribers", "**", `*.${fileExtension}`);

const isDev = process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "moltbuddy_db",
  synchronize: isDev,
  migrationsRun: !isDev,
  logging: isDev,
  timezone: "Z",
  dateStrings: ["DATETIME"],
  extra: {
    connectionLimit: 10,
    connectTimeout: 30000,
  },
  poolSize: 10,
  maxQueryExecutionTime: 30000,
  entities: [entitiesGlob],
  migrations: [migrationsGlob],
  subscribers: isTsMode ? [] : [subscribersGlob],
});
