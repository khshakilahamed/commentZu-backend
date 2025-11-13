import z from "zod";

export const registerSchema = z.object({
      body: z.object({
            firstName: z.string().trim().min(1).max(30),
            lastName: z.string().trim().min(1).max(30),
            email: z.email(),
            password: z.string().min(4).max(250),
      })
})

export const loginPayloadSchema = z.object({
            email: z.email(),
            password: z.string().min(1).max(250),
      })

export const loginSchema = z.object({
      body: loginPayloadSchema
})