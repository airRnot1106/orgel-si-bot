import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import {
  createHistory,
  fetchHistories,
  fetchHistory,
} from '@/libs/api/history';
import { safeParseSchema } from '@/libs/zod';
import { createApiActionResponse400 } from '@/utils/api';

export const history = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        id: z.string(),
        limit: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          const res = createApiActionResponse400(result.error.message);
          return c.json(res, res.status);
        }
      }
    ),

    async (c) => {
      const { id, limit: limitString } = c.req.valid('query');

      const parsedLimit = safeParseSchema(
        z.number().int(),
        Number(limitString)
      );
      if (!parsedLimit.ok) {
        const res = createApiActionResponse400(parsedLimit.error.message);
        return c.jsonT(res, res.status);
      }

      const limit = parsedLimit.data;

      const res =
        id !== ''
          ? await fetchHistory({ historyId: id })
          : await fetchHistories({ limit });
      return c.jsonT(res, res.status);
    }
  )
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        requestId: z.string(),
      }),
      (result, c) => {
        if (!result.success) {
          const res = createApiActionResponse400(result.error.message);
          return c.json(res, res.status);
        }
      }
    ),
    async (c) => {
      const { requestId } = c.req.valid('json');

      const res = await createHistory({ requestId });
      return c.jsonT(res, res.status);
    }
  );
