module.exports = function(){
    return `import fastify from "fastify";
import compress from "fastify-compress";
import cors from "fastify-cors";
import multer from "fastify-multer";
import healthCheck from "fastify-healthcheck";
import oas from "fastify-oas";
import formbody from "fastify-formbody";
import env from "dotenv";
import favicon from "@wwa/fastify-favicon";

import { config } from "./config";
import { CustomerRoutes, UploadRoutes } from "../routes";

env.config();
const app = fastify({ logger: true });

app.register(healthCheck);
app.register(compress);
app.register(formbody);
app.register(cors);
app.register(favicon);
app.register(multer.contentParser);
app.register(oas, {
    routePrefix: "/documentation",
    swagger: {
        info: {
            title: config.appName,
            description: "testing the fastify swagger api",
            version: "0.1.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        host: config.serverURI,
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        securityDefinitions: {
            apiKey: {
                type: "apiKey",
                name: "apiKey",
                in: "header",
            },
        },
    },
    exposeRoute: true,
});

app.register(CustomerRoutes);
app.register(UploadRoutes);

app.ready(function (error) {
    if (error) throw error;
    app.oas();
});

export default app;`
}


