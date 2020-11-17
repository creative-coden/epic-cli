module.exports = function(){
    return `import winston from "winston";
import env from "dotenv";

env.config();

const Logger: winston.Logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",

  format:
    process.env.NODE_ENV === "production"
      ? winston.format.json()
      : winston.format.combine(
        winston.format.label({ label: process.env.APP_NAME}),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(function ({ level, message, label, timestamp, ...options }) {
          if (options.metadata) return \`\${timestamp} [\${label}] \${level}: \${message} metadata: \${JSON.stringify(options.metadata)}\`;
          return \`\${timestamp} [\${label}] \${level}: \${message}\`;
        })
      ),
  defaultMeta: { service: process.env.APP_NAME },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default Logger;`
}