module.exports = function(){
    return `import fastify from "fastify";
import compress from "fastify-compress";
import cors from "fastify-cors";
import multer from "fastify-multer";
import healthCheck from "fastify-healthcheck";
import oas from "fastify-oas";
import env from "dotenv";

import { CustomerRoutes, UploadRoutes } from "../routes";

env.config();
const app = fastify({ logger: true });

app.register(healthCheck);
app.register(compress);
app.register(cors);
app.register(multer.contentParser);
app.register(oas, {
    routePrefix: "/documentation",
    swagger: {
        info: {
            title: \`\${process.env.APP_NAME?.replace(/_/, " ")}\`,
            description: "testing the fastify swagger api",
            version: "0.1.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        host: "localhost:5000",
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


