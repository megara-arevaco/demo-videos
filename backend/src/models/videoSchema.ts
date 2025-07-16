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
