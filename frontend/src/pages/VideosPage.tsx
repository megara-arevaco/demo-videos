import { PageContainer } from "../components/PageContainer/PageContainer";
import { VideoList } from "../components/VideoList/VideoList";
import { useVideoList } from "../hooks/useVideoList";

export function VideosPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    currentPage,
    sortOrder,
    handleSortChange,
    handlePageChange,
  } = useVideoList();

  return (
    <PageContainer>
      <VideoList
        data={data}
        isLoading={isLoading}
        isError={isError}
        error={error as Error}
        currentPage={currentPage}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        onPageChange={handlePageChange}
      />
    </PageContainer>
  );
}