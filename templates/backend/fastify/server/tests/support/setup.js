module.exports = function(){
    return `import fastify, { FastifyInstance } from "fastify";

function build(opts = {}): FastifyInstance {
  const app = fastify(opts);
  
  app.get("/", async function helloWorld() {
    return { hello: "world" };
  });

  return app;
}

export default build;
    `
}