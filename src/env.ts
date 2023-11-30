import { z } from "zod"

const envSchema = z.object({
	INFURA_API_KEY: z.string(),
	INFURA_API_KEY_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
