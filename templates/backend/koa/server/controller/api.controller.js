module.exports = function(){
  return `import {
    createCustomerService,
    fetchCustomerService,
    updateCustomerService,
    deleteCustomerService,
  } from "../services/customer.service";
  import logger from "../libs/logger";
  import { ParameterizedContext } from "koa";
  
  export async function createCustomerController(ctx: ParameterizedContext): Promise<void> {
    ctx.created(await createCustomerService(ctx.request.body));
  }
  
  export async function fetchCustomerController(ctx: ParameterizedContext): Promise<void> {
    logger.info("Calling fetchCustomerController");
    ctx.oK(await fetchCustomerService(), "data returned successfully");
  }
  
  export async function updateCustomerController(ctx: ParameterizedContext): Promise<void> {
    ctx.oK(await updateCustomerService(ctx.params.id, ctx.request.body));
  }
  
  export async function deleteCustomerController(ctx: ParameterizedContext): Promise<void> {
    ctx.accepted(await deleteCustomerService(ctx.params.id));
  }     
  `
}

