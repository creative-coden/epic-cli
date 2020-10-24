module.exports = function(){
    return `import os from 'os';
import winston from 'winston';
import env from 'dotenv';

env.config();

class Logger {
  constructor(name, options = {}) {
    this.name = name;
    this.hostname = os.hostname();
    this.level = options.level;
    this.logger = winston.createLogger({
      level: this.level,
      defaultMeta: { service: name },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.metadata({
              fillExcept: ['timestamp', 'service', 'level', 'message'],
            }),
            winston.format.colorize(),
            this.winstonConsoleFormat(),
          ),
        }),
        new winston.transports.File({
          filename: \`./logs/\${name}.log\`,
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.metadata(),
            winston.format.json(),
          ),
        }),
      ],
    });
  }

  winstonConsoleFormat() {
    return winston.format.printf(
      function printf({ timestamp, level, message }) {
        return \`[\${timestamp}][\${level}][\${this.name}@\${this.hostname}] \${message}.\`;
      }.bind(this),
    );
  }

  debug(log) {
    this.log('debug', log);
  }

  info(log) {
    this.log('info', log);
  }

  warn(log) {
    this.log('warn', log);
  }

  error(log) {
    this.log('error', log);
  }

  log(level, log) {
    this.logger[level](JSON.stringify(log));
  }
}

export default new Logger(process.env.APP_NAME, {
  logLevel: process.env.LOG_LEVEL,
});
    `
}