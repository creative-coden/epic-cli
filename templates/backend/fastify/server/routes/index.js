module.exports = function(){
    return `import { CustomerController } from '../controller/customer.controller';
import { UploadController } from '../controller/upload.controller';

export { CustomerController as CustomerRoutes, UploadController as UploadRoutes };
`
}



