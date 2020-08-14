module.exports = function(){
    return `import Koa from 'koa';
    import bodyParser from 'koa-bodyparser';
    import compress from 'koa-compress';
    import logger from 'koa-logger';
    import Router from 'koa-router';
    import respond from 'koa-respond';
    import helmet from 'koa-helmet';
    import routes from '../routes/index.mjs';
    
    const app = new Koa();
    const router = new Router();
    
    app.use(helmet());
    app.use(logger());
    app.use(bodyParser());
    app.use(compress());
    app.use(respond());
    app.use(routes);
    app.use(router.allowedMethods());
    
    export default app;`
}


