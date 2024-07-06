import { z } from "zod"

export const LoginSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3)
})

export const SignUpSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3)
})



