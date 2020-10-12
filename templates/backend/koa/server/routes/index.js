module.exports = function(){
    return `import Router from 'koa-router';
import { fetchApiController, updateApiController } from '../controller/api.controller.mjs';

const router = new Router();

router.get('/getCharacters', fetchApiController)
.post('/updateCharacters' , updateApiController);

export default router.routes();`
}



