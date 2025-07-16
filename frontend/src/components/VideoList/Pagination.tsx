import { Button } from "@/components/ui/button";

type PaginationData = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type PaginationProps = {
  pagination: PaginationData;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  pagination,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 items-center">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!pagination.hasPrevPage}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!pagination.hasNextPage}
      >
        Next
      </Button>
    </div>
  );
}
