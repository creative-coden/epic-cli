module.exports = function(){
    return `import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaResponse from "koa-response2";
import compress from "koa-compress";
import logger from "koa-logger";
import Router from "koa-router";
import helmet from "koa-helmet";
import env from "dotenv";
import cors from "@koa/cors";

import routes from "../routes/";

env.config();
const app = new Koa();
const router = new Router();

app.use(cors());
app.use(helmet());
app.use(logger());
app.use(bodyParser());
app.use(compress());
app.use(koaResponse({
  format(status, payload, message = "") {
    return {
      code: status,
      data: payload,
      message
    };
  },
}));
app.use(routes);
app.use(router.allowedMethods());

export default app;`
}


