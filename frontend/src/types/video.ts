import { z } from "zod";

export const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  tags: z.array(z.string()),
  created_at: z.string(),
  thumbnail_url: z.string(),
  duration: z.number(),
  views: z.number(),
});

export type Video = z.infer<typeof VideoSchema>;

export const VideosResponseSchema = z.object({
  results: z.array(VideoSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

export type VideosResponse = z.infer<typeof VideosResponseSchema>;