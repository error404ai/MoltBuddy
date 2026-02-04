import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const Logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(errors({ stack: true }), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), customFormat),
    }),
  ],
});

export default Logger;
