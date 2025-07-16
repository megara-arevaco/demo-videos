import { z } from "zod";

export const UploadVideoSchema = z.object({
  title: z.string().min(1),
  tags: z.string().min(1).refine((tags) => {
    const tagArray = tags.split(",").map(tag => tag.trim()).filter(Boolean);
    return tagArray.length > 0;
  }, {
    message: "At least one tag is required"
  }),
  file: z.string(),
});

export type UploadVideoData = z.infer<typeof UploadVideoSchema>;
