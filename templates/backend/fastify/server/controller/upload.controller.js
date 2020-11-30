module.exports = function(){
    return `import { FastifyInstance } from "fastify";
import multer from "fastify-multer";
import { uploadService } from "../services/upload.service";

const upload = multer({ dest: "uploads/" });

const uploadSchema = {
  summary: "upload file",
  body: {
    type: "object",
    properties: {
      file: { type: "object" }
    },
    required: ["file"]
  }
};

interface IFile {
  file: { [key: string]: string }
}

export async function UploadController(fastify: FastifyInstance): Promise<void> {

  fastify.route({
    method: "POST",
    url: "/upload",
    schema: uploadSchema,
    preHandler: upload.single("excel"),
    handler: async function upload(request, reply) {
      reply.send(await uploadService((request.body as IFile)));
    }
  });
}`
}