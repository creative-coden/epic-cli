module.exports = function(){
    return `import { ParameterizedContext } from "koa";

export function uploadService(ctx: ParameterizedContext): string | void {
  try {
    console.log(ctx);
    return "Uploaded successfully";
  } catch (error) {
    console.error(error);
  }
}`
}