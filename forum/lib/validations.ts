import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});
