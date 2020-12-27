module.exports = function () {
  return `import dotenv from 'dotenv';

interface Config {
  host: string;
  port: string;
  serverURI: string | undefined;
  appName: string | undefined;
  environment: string;
}

dotenv.config();

const config: Config = {
  host: '0.0.0.0',
  port: process.env.PORT || '5000',
  serverURI: process.env.SERVER_URI,
  appName: process.env.APP_NAME,
  environment: process.env.NODE_ENV || 'production',
};

export { config };
`;
};
