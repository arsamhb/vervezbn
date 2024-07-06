import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3)
})