import { describe, it, expect } from "vitest";
import app from "../../app";

describe("POST /videos", () => {
  it("should return 400 if title is missing", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/videos",
      payload: { tags: "tag1,tag2", file: "video.mp4" },
    });

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body)).toHaveProperty("error");
  });

  it("should create a video successfully and return 200", async () => {
    const videoData = {
      title: "New video",
      tags: "tag1,tag2",
      file: "video.mp4",
    };

    const res = await app.inject({
      method: "POST",
      url: "/api/videos",
      payload: videoData,
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toMatchObject({
      message: "Video uploaded successfully",
      data: {
        id: expect.any(String),
        title: videoData.title,
        tags: ["tag1", "tag2"],
        thumbnail_url: "https://picsum.photos/seed/video30/300/200",
        duration: 120,
        views: 230,
        created_at: expect.any(String),
      },
    });
  });
});
