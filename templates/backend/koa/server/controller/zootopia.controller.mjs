module.exports = function(){
  return `import { fetchZootopiaServices } from '../services/zootopia.services.mjs';

  export async function fetchZootopiaController(ctx) {
    try {
      ctx.ok(await fetchZootopiaServices());
    } catch (error) {
      console.log('error', error);
    }
  }
  
  export async function updateZootopiaController(ctx) {
    try {
      ctx.ok(await fetchZootopiaServices());
    } catch (error) {
      console.log('error', error);
    }
  }`
}

