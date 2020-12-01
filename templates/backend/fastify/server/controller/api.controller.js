module.exports = function(){
  return `import { FastifyInstance } from "fastify";
import {
  createCustomerService,
  fetchCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customer.service";

const createCustomerRequestSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" }
  },
  required: ["id", "name"]
};

const successResponseSchema = {
  response: {
    "2xx": {
      type: "string",
    },
    201: {
      type: "string",
    }
  }
};

const getCustomersSchema = {
  response: successResponseSchema,
};

const createCustomerSchema = {
  body: createCustomerRequestSchema,
  response: successResponseSchema
};

const updateCustomerRequestSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" }
  }
};

const updateCustomerSchema = {
  body: updateCustomerRequestSchema,
  response: successResponseSchema
};

const deleteCustomerParamsSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  }
};

const deleteCustomerSchema = {
  params: deleteCustomerParamsSchema,
  response: successResponseSchema
};

interface iCustomers {
  name: string,
  id: string,
}

interface iParams {
  id: string,
}

export async function CustomerController(fastify: FastifyInstance): Promise<void> {
  fastify.route({
    method: "POST",
    url: "/customers",
    schema: createCustomerSchema,
    handler: async function createCustomerController(request, reply) {
      return reply.code(201).send(await createCustomerService(<iCustomers>request.body));
    }
  });

  fastify.route({
    method: "GET",
    url: "/customers",
    schema: getCustomersSchema,
    handler: async function fetchCustomerController(request, reply) {
      return reply.send(await fetchCustomerService());
    }
  });


  fastify.route({
    method: "PUT",
    url: "/customers/:id",
    schema: updateCustomerSchema,
    handler: async function updateCustomerController(request, reply) {
      return reply.send(await updateCustomerService(<iCustomers>request.body));
    }
  });

  fastify.route({
    method: "DELETE",
    url: "/customers/:id",
    schema: deleteCustomerSchema,
    handler: async function deleteCustomerController(request, reply) {
      return reply.send(await deleteCustomerService(<iParams>request.params));
    }
  });
}`
}

