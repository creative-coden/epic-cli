module.exports = function(){
    return `import { uploadService } from '../services/upload.service';

export async function uploadController(ctx) {
  try {
    ctx.created(await uploadService(ctx));
  } catch (error) {
    console.error('error', error);
  }
}
`
}