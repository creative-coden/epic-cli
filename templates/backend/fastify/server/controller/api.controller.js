module.exports = function(){
  return `import { FastifyInstance } from "fastify";
import { Type } from "@sinclair/typebox";
import {
  createCustomerService,
  fetchCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customer.service";

const createCustomerRequestSchema = Type.Array(
  Type.Object({
    id: Type.String({
      example: "1",
      description: "unique identifier for a customer",
    }),
    name: Type.String({ example: "Paul", description: "name of customer" }),
  }),
);

const createCustomerResponseSchema = {
  201: Type.String({ example: "Successfully create customer", description: "Success message" })
};

const customerResponseBodySchema = {
  200: Type.Array(
    Type.Object({
      id: Type.String({
        example: "1",
        description: "unique identifier for a customer",
      }),
      name: Type.String({ example: "Paul", description: "name of customer" }),
    }),
  ),
};

const getCustomersSchema = {
  response: customerResponseBodySchema,
};

const createCustomerSchema = {
  body: createCustomerRequestSchema,
  response: createCustomerResponseSchema
};

const updateCustomerRequestSchema = Type.Object({
  id: Type.String({ example: "1", description: "Unique identifier for customer" }),
  name: Type.String({ example: "Paul", description: "name of customer" })
});

const successResponseSchema = {
  200: Type.String({ description: "Success message" })
};

const updateCustomerSchema = {
  body: updateCustomerRequestSchema,
  response: successResponseSchema
};

const deleteCustomerParamsSchema = Type.Object({
  id: Type.String()
});

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
      return reply.code(201).send(await createCustomerService(<iCustomers[]>request.body));
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

