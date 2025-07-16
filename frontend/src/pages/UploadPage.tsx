import { PageContainer } from "../components/PageContainer/PageContainer";
import { UploadVideo } from "../components/UploadVideo/UploadVideo";
import { useVideoUpload } from "../hooks/useVideoUpload";

export function UploadPage() {
  const {
    isUploading,
    uploadSuccess,
    uploadError,
    handleSubmit,
    reset,
  } = useVideoUpload();

  return (
    <PageContainer>
      <UploadVideo
        isUploading={isUploading}
        uploadSuccess={uploadSuccess}
        uploadError={uploadError}
        onSubmit={handleSubmit}
        onReset={reset}
      />
    </PageContainer>
  );
}