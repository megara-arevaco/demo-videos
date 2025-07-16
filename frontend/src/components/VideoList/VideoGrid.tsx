import type { Video } from "../../types/video";
import { VideoCard } from "../VideoCard/VideoCard";

type VideoGridProps = {
  videos: Video[];
};

export function VideoGrid({ videos }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
