import { videoRepository, CreateVideoData } from "../database/videoRepository";
import { Video } from "../models/videoSchema";

const prepareTags = (tags?: string) => {
  if (!tags) {
    return [];
  }
  const trimmed = tags.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return JSON.parse(trimmed);
  }

  return trimmed
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const getVideos = async (
  limit: number,
  offset: number,
  sortOrder: "asc" | "desc" = "desc"
): Promise<{ videos: Video[]; total: number }> => {
  try {
    const { videos, total } = await videoRepository.getVideos(
      limit,
      offset,
      sortOrder
    );

    const transformedVideos = videos.map((video) => ({
      ...video,
      id: video.id.toString(),
      tags: prepareTags(video.tags),
    }));

    return {
      videos: transformedVideos,
      total,
    };
  } catch (error) {
    console.error("Error loading paginated videos from database:", error);
    return { videos: [], total: 0 };
  }
};

const createVideo = async (data: CreateVideoData): Promise<Video> => {
  const createdVideo = await videoRepository.createVideo(data);

  return {
    ...createdVideo,
    id: createdVideo.id.toString(),
    tags: prepareTags(createdVideo.tags),
  };
};

export default { getVideos, createVideo };
