import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import type { VideoUploadForm } from "../../types/upload";

type UploadFormProps = {
  isUploading: boolean;
  onSubmit: (data: VideoUploadForm) => void;
};

export function UploadForm({ isUploading, onSubmit }: UploadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VideoUploadForm>();

  const handleFormSubmit = (data: VideoUploadForm) => {
    onSubmit({
      ...data,
      file: "video.mp4", // Placeholder for file name, adjust in the future for real File
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-file">Video File</Label>
            <Input
              id="video-file"
              type="file"
              accept="video/*"
              {...register("file")}
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter video title"
              {...register("title", { required: "Title is required" })}
              disabled={isUploading}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              type="text"
              placeholder="Enter tags separated by commas"
              {...register("tags", {
                required: "At least one tag is required",
              })}
              disabled={isUploading}
            />
            {errors.tags && (
              <p className="text-sm text-red-600">{errors.tags.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
