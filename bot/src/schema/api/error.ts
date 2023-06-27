import { z } from 'zod';

export const apiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
  }),
});
