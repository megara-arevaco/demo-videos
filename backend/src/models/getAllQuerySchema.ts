import { z } from "zod";

export const GetAllQuerySchema = z.object({
  limit: z.string().optional(),
  page: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export type GetAllQuery = z.infer<typeof GetAllQuerySchema>;
