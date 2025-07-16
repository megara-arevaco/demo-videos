import type { VideoUploadForm } from "../../types/upload";
import { UploadForm } from "./UploadForm";
import { UploadSuccess } from "./UploadSuccess";
import { UploadError } from "./UploadError";

type UploadVideoProps = {
  isUploading: boolean;
  uploadSuccess: boolean;
  uploadError: string | null;
  onSubmit: (data: VideoUploadForm) => void;
  onReset: () => void;
};

export function UploadVideo({
  isUploading,
  uploadSuccess,
  uploadError,
  onSubmit,
  onReset,
}: UploadVideoProps) {
  return (
    <div className="w-full p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Video</h1>
      </div>
      <div className="max-w-md mx-auto space-y-4">
        {uploadError && <UploadError error={uploadError} onRetry={onReset} />}

        {uploadSuccess ? (
          <UploadSuccess onReset={onReset} />
        ) : (
          <UploadForm isUploading={isUploading} onSubmit={onSubmit} />
        )}
      </div>
    </div>
  );
}
