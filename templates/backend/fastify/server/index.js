module.exports = function () {
  return `import env from "dotenv";
import util from "util";
import app from "./server/config/app";

env.config();

process.on("uncaughtException", function uncaughtException(error) {
  app.log.error(\`\${process.env.APP_NAME} crashed \${error.stack} || \${error}\`);
});

process.on("unhandledRejection", function unhandledRejection(reason, promise) {
  app.log.error(\`unhandled rejection at \${util.inspect(promise)} reason \${reason}\`);
});

process.on("SIGINT", async function signalInt() {
  app.log.info(\`Shutting down the services of \${process.env.APP_NAME}\`);
  app.close().then(() => {
    app.log.info("successfully closed!");
  }, (err) => {
    app.log.error("an error happened", err);
  });
});

(async function start() {
  try {
    const address = await app.listen(process.env.SERVER_PORT as string, "0.0.0.0");
    app.log.info(\`Server is up and listening on \${address}\`);
  } catch (error) {
    app.log.error(\`Error starting server \${error}\`);
    process.exit(1);
  }
})();`;
};
