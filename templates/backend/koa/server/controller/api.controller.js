module.exports = function(){
  return `import {
  createCustomerService,
  fetchCustomerService,
  updateCustomerService,
  deleteCustomerService,
} from '../services/customer.service.mjs';
import logger from '../libs/logger';

export async function createCustomerController(ctx) {
  try {
    ctx.created(await createCustomerService(ctx.request.body));
  } catch (error) {
    logger.error(error);
  }
}

export async function fetchCustomerController(ctx) {
  try {
    logger.info('Calling fetchCustomerController');
    ctx.ok(await fetchCustomerService(Number(ctx.params.id)));
  } catch (error) {
    logger.error(error);
  }
}

export async function updateCustomerController(ctx) {
  try {
    ctx.ok(await updateCustomerService(Number(ctx.params.id), ctx.request.body));
  } catch (error) {
    logger.error(error);
  }
}

export async function deleteCustomerController(ctx) {
  try {
    ctx.accepted(await deleteCustomerService(Number(ctx.params.id)));
  } catch (error) {
    logger.error(error);
  }
}    
  `
}

