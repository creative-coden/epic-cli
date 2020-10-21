module.exports = function(){
    return `import Router from 'koa-router';
import multer from '@koa/multer';
import {
  createCustomerController,
  fetchCustomerController,
  updateCustomerController,
  deleteCustomerController,
} from '../controller/customer.controller.mjs';
import { uploadController } from '../controller/upload.controller.mjs';

const upload = multer();
const router = new Router();

router
  .post('/customers', createCustomerController)
  .get('/customers', fetchCustomerController)
  .get('/customers/:id', fetchCustomerController)
  .put('/customers/:id', updateCustomerController)
  .delete('/customers/:id', deleteCustomerController);

router.post('/excel', upload.single('excel'), uploadController);

export default router.routes();`
}



