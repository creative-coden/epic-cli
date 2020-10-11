module.exports = function(){
    return `import Router from 'koa-router';
    import { fetchZootopiaController, updateZootopiaController } from '../controller/zootopia.controller.mjs';
    
    const router = new Router();
    
    router.get('/getCharacters', fetchZootopiaController)
    .post('/updateCharacters' , updateZootopiaController);
    
    export default router.routes();`
}



