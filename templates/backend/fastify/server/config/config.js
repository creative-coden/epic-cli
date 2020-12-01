module.exports = function () {
  return `import dotenv from "dotenv";
import pkg from "../../package.json";

interface Config {
  host: string;
  port: string;
  serverURI: string | undefined;
  appName: string;
  environment: string;
}

dotenv.config({ path: ".env" });

const config: Config = {
  host: "0.0.0.0",
  port: (process.env.PORT || "5000"),
  serverURI: process.env.SERVER_URI,
  appName: pkg.name,
  environment: (process.env.NODE_ENV || "production")
};

export { config };
  `;
};
