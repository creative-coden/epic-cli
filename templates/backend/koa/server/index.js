module.exports = function () {
  return `import * as util from "util";
import * as http from "http";

import app from "./server/config/app";
import logger from "./server/libs/logger";
const server = http.createServer(app.callback());

process.on("uncaughtException", function uncaughtException(error) {
  logger.error(\`\${process.env.APP_NAME} crashed \${error.stack} || \${error}\`);
});

process.on("unhandledRejection", function unhandledRejection(reason, promise) {
  logger.error(\`unhandled rejection at \${util.inspect(promise)} reason \${reason}\`);
});

process.on("SIGINT", function signalInt() {
  logger.info(\`Shutting down the services of \${process.env.APP_NAME}\`);
  server.close(function close() {
    process.exit(1);
  });
});

(async function startApp() {
  await server.listen(process.env.SERVER_PORT);
  logger.info(\`Server is up and running on port \${process.env.SERVER_PORT}\`, { metadata: "1234" });
})();
  `;
};
