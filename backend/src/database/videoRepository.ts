import { getDatabase } from "./connection";

export type Video = {
  id: number;
  title: string;
  tags: string;
  thumbnail_url: string;
  duration: number;
  views: number;
  created_at: string;
};

export type CreateVideoData = {
  title: string;
  tags?: string;
  thumbnail_url?: string;
  duration?: number;
  views?: number;
};

export class VideoRepository {
  async getVideos(
    limit: number,
    offset: number,
    sortOrder: "asc" | "desc" = "desc"
  ): Promise<{ videos: Video[]; total: number }> {
    const db = await getDatabase();
    const orderBy = sortOrder === "asc" ? "ASC" : "DESC";

    const [videos, countResult] = await Promise.all([
      db.all(
        `SELECT * FROM videos ORDER BY created_at ${orderBy} LIMIT ? OFFSET ?`,
        [limit, offset]
      ),
      db.get("SELECT COUNT(*) as total FROM videos"),
    ]);

    return {
      videos,
      total: countResult.total,
    };
  }

  async createVideo(data: CreateVideoData): Promise<Video> {
    const db = await getDatabase();
    const result = await db.run(
      `
      INSERT INTO videos (title, tags, thumbnail_url, duration, views, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        data.title,
        data.tags || "",
        data.thumbnail_url || "https://picsum.photos/seed/video30/300/200",
        data.duration || 120,
        data.views || 230,
        new Date().toISOString(),
      ]
    );

    return this.getVideoById(result.lastID!);
  }

  async getVideoById(id: number): Promise<Video> {
    const db = await getDatabase();
    const video = await db.get("SELECT * FROM videos WHERE id = ?", [id]);
    if (!video) {
      throw new Error(`Video with id ${id} not found`);
    }
    return video;
  }
}

export const videoRepository = new VideoRepository();
