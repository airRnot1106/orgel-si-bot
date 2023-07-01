import type { Result } from '@/types/result';
import type { z } from 'zod';

import { err, ok } from '@/utils/result';

export const safeParseSchema = <T>(
  schema: z.Schema<T>,
  data: unknown
): Result<z.infer<z.Schema<T>>, Error> => {
  const result = schema.safeParse(data);
  if (result.success) {
    return ok(result.data);
  }
  return err(result.error);
};
