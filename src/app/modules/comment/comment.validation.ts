import z from "zod";

export const addCommentSchema = z.object({
      body: z.object({
            content: z.string().trim().nonempty("Content is required")
      })
});

export const getCommentSchema = z.object({
      query: z.object({
            page: z
                  .string()
                  .transform((val) => (val ? parseInt(val, 10) : 1))
                  .optional()
                  ,
            limit: z
                  .string()
                  .transform((val) => (val ? parseInt(val, 10) : 10))
                  .optional(),
            sortBy: z
                  .enum(['mostLiked', 'mostDisliked', 'newest'])
                  .default('newest')
                  .optional(),
            sortOrder: z.enum(['asc', 'desc']).default('desc').optional(),
      }),
})