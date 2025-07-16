import { FastifyInstance } from "fastify";
import videosController from "../controllers/videosController";
import { GetAllQuerySchema } from "../models/getAllQuerySchema";
import { UploadVideoSchema } from "../models/uploadVideoSchema";

export default async function videosRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        querystring: GetAllQuerySchema,
      },
    },
    videosController.getAll
  );

  fastify.post(
    "/",
    {
      schema: {
        body: UploadVideoSchema,
      },
    },
    videosController.uploadVideo
  );
}
