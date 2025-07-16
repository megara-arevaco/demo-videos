import videosService from "../services/videosService";
import { FastifyRequest, FastifyReply } from "fastify";
import { GetAllQuery } from "../models/getAllQuerySchema";
import { UploadVideoData } from "../models/uploadVideoSchema";

const getAll = async (
  request: FastifyRequest<{ Querystring: GetAllQuery }>,
  reply: FastifyReply
) => {
  try {
    const limit = request.query.limit ? parseInt(request.query.limit) : 10;
    const page = request.query.page ? parseInt(request.query.page) : 1;
    const offset = page > 1 ? (page - 1) * limit : 0;
    const sortOrder = request.query.sortOrder || "desc";

    const { videos, total } = await videosService.getVideos(
      limit,
      offset,
      sortOrder
    );

    const totalPages = Math.ceil(total / limit);

    reply.send({
      results: videos,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error in getAll:", error);
    reply.status(500).send({
      error: "Internal Server Error",
      message: error?.message || "Unexpected error",
    });
  }
};

const uploadVideo = async (
  request: FastifyRequest<{ Body: UploadVideoData }>,
  reply: FastifyReply
) => {
  try {
    const { title, tags } = request.body;

    const newVideo = await videosService.createVideo({
      title,
      tags,
    });

    reply.send({
      message: "Video uploaded successfully",
      data: newVideo,
    });
  } catch (error: any) {
    console.error("Error in uploadVideo:", error);

    reply.status(500).send({
      error: "Internal Server Error",
      message: error?.message || "Unexpected error during upload",
    });
  }
};

export default { getAll, uploadVideo };
