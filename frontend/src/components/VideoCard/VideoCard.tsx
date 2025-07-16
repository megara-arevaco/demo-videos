import type { Video } from "../../types/video";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type VideoCardProps = {
  video: Video;
};

export function VideoCard({ video }: VideoCardProps) {
  const [loaded, setLoaded] = useState(false);

  const onImageLoad = () => setLoaded(true);

  return (
    <Card className="w-full">
      <CardHeader className="overflow-hidden p-0">
        <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-200 dark:bg-gray-800">
              <span className="text-gray-400">Loading image…</span>
            </div>
          )}
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={onImageLoad}
          />
        </div>
      </CardHeader>
      <div className="p-2">
        <CardTitle className="p-2">{video.title}</CardTitle>
        <CardDescription className="mb-2 p-2 flex flex-wrap gap-x-2 gap-y-1">
          {video.tags.map((tag) => (
            <span key={tag} className="">
              #{tag}
            </span>
          ))}
        </CardDescription>
        <CardContent className="p-2">
          {new Date(video.created_at).toLocaleDateString()} • {video.duration} •{" "}
          {video.views} views
        </CardContent>
      </div>
    </Card>
  );
}
