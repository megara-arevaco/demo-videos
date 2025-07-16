import { render, screen } from "@testing-library/react";
import { VideoCard } from "./VideoCard";
import type { Video } from "../../types/video";

const mockVideo: Video = {
  id: "1",
  title: "Test Video",
  tags: ["testtag", "testtag2"],
  created_at: "2024-01-01T12:00:00Z",
  thumbnail_url: "https://example.com/thumb.jpg",
  duration: 120,
  views: 100,
};

describe("VideoCard", () => {
  it("renders video title", () => {
    render(<VideoCard video={mockVideo} />);

    expect(screen.getByText("Test Video")).toBeInTheDocument();
  });

  it("renders video tags", () => {
    render(<VideoCard video={mockVideo} />);

    expect(screen.getByText("#testtag")).toBeInTheDocument();
    expect(screen.getByText("#testtag2")).toBeInTheDocument();
  });

  it("renders video views", () => {
    render(<VideoCard video={mockVideo} />);

    expect(screen.getByText(/100.*views/)).toBeInTheDocument();
  });
});
