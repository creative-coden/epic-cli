module.exports = function(){
  return `import { FastifyInstance } from "fastify";
import {
  createCustomerService,
  fetchCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from "../services/customer.service";
import CustomerResponseSchema from "./schemas/response.json";
import SuccessStatusSchema from "./schemas/success.json";
import ParamsSchema from "./schemas/params.json";
import { IRequestBody, IParams } from "./types";

export async function CustomerController(fastify: FastifyInstance): Promise<void> {
  fastify.route<{ Body: IRequestBody }>({
    method: "POST",
    url: "/customers",
    schema: {
      response: SuccessStatusSchema,
    },
    handler: async function createCustomerController(request, reply) {
      return reply.code(201).send(await createCustomerService(request.body));
    },
  });

  fastify.route({
    method: "GET",
    url: "/customers",
    schema: {
      response: CustomerResponseSchema,
    },
    handler: async function fetchCustomerController(request, reply) {
      return reply.send(await fetchCustomerService());
    },
  });

  fastify.route<{ Body: IRequestBody }>({
    method: "PUT",
    url: "/customers/:id",
    schema: {
      params: ParamsSchema,
    },
    handler: async function updateCustomerController(request, reply) {
      return reply.send(await updateCustomerService(request.body));
    },
  });

  fastify.route<{ Params: IParams }>({
    method: "DELETE",
    url: "/customers/:id",
    schema: {
      response: SuccessStatusSchema,
    },
    handler: async function deleteCustomerController(request, reply) {
      return reply.send(await deleteCustomerService(request.params.id));
    },
  });
}`
}

