import { z } from 'zod';

export const envSchema = z.object({
  API_ENDPOINT: z.string(),
  DATABASE_URL: z.string(),
  DISCORD_TOKEN: z.string(),
});

export type Env = z.infer<typeof envSchema>;
