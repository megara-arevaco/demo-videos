import type { VideosResponse } from "../../types/video";
import { VideoListHeader } from "./VideoListHeader";
import { VideoGrid } from "./VideoGrid";
import { Pagination } from "./Pagination";

type StateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  isEmpty: boolean;
};

type VideoListProps = {
  data?: VideosResponse;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  currentPage: number;
  sortOrder: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
  onPageChange: (page: number) => void;
};

function VideoListState({ isLoading, isError, error, isEmpty }: StateProps) {
  if (isLoading) {
    return <div className="p-4">Loading videos...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error: {error?.message}</div>;
  }

  if (isEmpty) {
    return <div className="p-4">No videos found.</div>;
  }

  return null;
}

export function VideoList({
  data,
  isLoading,
  isError,
  error,
  currentPage,
  sortOrder,
  onSortChange,
  onPageChange,
}: VideoListProps) {
  const isEmpty = !data?.results.length;

  if (isLoading || isError || isEmpty) {
    return (
      <VideoListState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={isEmpty}
      />
    );
  }

  return (
    <div className="w-full p-4">
      <VideoListHeader sortOrder={sortOrder} onSortChange={onSortChange} />
      <VideoGrid videos={data.results} />
      <Pagination
        pagination={data.pagination}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
