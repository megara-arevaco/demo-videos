import { useMutation } from "@tanstack/react-query";
import type { VideoUploadForm } from "../types/upload";
import { API_URL } from "../config/api";

const uploadVideo = async (data: VideoUploadForm) => {
  const response = await fetch(`${API_URL}/api/videos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      tags: data.tags,
      file: data.file,
    }),
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
};

export function useVideoUpload() {
  const mutation = useMutation({
    mutationFn: uploadVideo,
  });

  const handleSubmit = (data: VideoUploadForm) => {
    mutation.mutate(data);
  };

  return {
    isUploading: mutation.isPending,
    uploadSuccess: mutation.isSuccess,
    uploadError: mutation.error?.message || null,
    handleSubmit,
    reset: mutation.reset,
  };
}
