import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { VideosResponseSchema } from "../types/video";
import { API_URL } from "../config/api";

const LIMIT = 12;

async function fetchVideos(
  page: number,
  sortBy: string,
  sortOrder: "asc" | "desc"
) {
  const res = await fetch(
    `${API_URL}/api/videos?page=${page}&limit=${LIMIT}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );

  if (!res.ok) {
    throw new Error("Error fetching videos");
  }

  const data = await res.json();

  return VideosResponseSchema.parse(data);
}

export function useVideoList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["videos", currentPage, "created_at", sortOrder],
    queryFn: () => fetchVideos(currentPage, "created_at", sortOrder),
  });

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    isLoading,
    isError,
    error,
    currentPage,
    sortOrder,
    handleSortChange,
    handlePageChange,
  };
}
