import { Video } from "../models/videoSchema";

const ascSort = (a: Video, b: Video): number =>
  new Date(a.created_at).getTime() - new Date(b.created_at).getTime();

const descSort = (a: Video, b: Video) =>
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

export function sortVideosByCreatedAt(videos: any[], sort?: "asc" | "desc") {
  if (sort === "asc") {
    return videos.sort(ascSort);
  } else if (sort === "desc") {
    return videos.sort(descSort);
  }

  return videos;
}
