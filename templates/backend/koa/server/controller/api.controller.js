module.exports = function(){
  return `import { fetchApiServices } from '../services/api.services.mjs';

export async function fetchApiController(ctx) {
  try {
    ctx.ok(await fetchApiServices());
  } catch (error) {
    console.log('error', error);
  }
}

export async function updateApiController(ctx) {
  try {
    ctx.ok(await fetchApiServices());
  } catch (error) {
    console.log('error', error);
  }
}`
}

