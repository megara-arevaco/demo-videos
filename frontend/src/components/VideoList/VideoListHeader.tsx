import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type VideoListHeaderProps = {
  sortOrder: "asc" | "desc";
  onSortChange: (value: "asc" | "desc") => void;
};

export function VideoListHeader({
  sortOrder,
  onSortChange,
}: VideoListHeaderProps) {
  return (
    <div className="mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Video List</h1>
      <Select value={sortOrder} onValueChange={onSortChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Descending</SelectItem>
          <SelectItem value="asc">Ascending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
