module.exports = function(){
    return `import Router from 'koa-router';
import {
  createCustomerController,
  fetchCustomerController,
  updateCustomerController,
  deleteCustomerController,
} from '../controller/customer.controller.mjs';

const router = new Router();

router
  .post('/customers', createCustomerController)
  .get('/customers', fetchCustomerController)
  .get('/customers/:id', fetchCustomerController)
  .put('/customers/:id', updateCustomerController)
  .delete('/customers/:id', deleteCustomerController);

export default router.routes()`
}



