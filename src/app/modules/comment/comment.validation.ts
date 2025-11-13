import z from "zod";

export const addCommentSchema = z.object({
      body: z.object({
            content: z.string().trim().nonempty("Content is required")
      })
});

export const getCommentSchema = z.object({
      query: z.object({
            page: z.coerce.number().int().min(1).default(1).optional(),
            limit: z.coerce.number().int().min(1).default(10).optional(),
            sortBy: z
                  .enum(['mostLiked', 'mostDisliked', 'newest'])
                  .default('newest')
                  .optional(),
            sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
      }),
});

export const likeCommentSchema = z.object({
      params: z.object({
            commentId: z.string(),
      }),
});
