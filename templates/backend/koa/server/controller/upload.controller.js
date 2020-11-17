module.exports = function(){
    return `import { uploadService } from "../services/upload.service";
import { ParameterizedContext } from "koa";

export async function uploadController(ctx: ParameterizedContext): Promise<void> {
  try {
    ctx.created(await uploadService(ctx));
  } catch (error) {
    console.error("error", error);
  }
}`
}