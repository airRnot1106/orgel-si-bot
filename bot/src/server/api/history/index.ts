import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import {
  createHistory,
  fetchHistories,
  fetchHistory,
} from '@/libs/api/history';
import { createApiActionResponse400 } from '@/utils/api';

export const history = new Hono()
  .get(
    '/',
    zValidator(
      'query',
      z.object({
        id: z.string().optional(),
        limit: z.number().optional(),
      }),
      (result, c) => {
        if (!result.success) {
          const res = createApiActionResponse400(result.error.message);
          return c.json(res, res.status);
        }
      }
    ),
    async (c) => {
      const { id, limit } = c.req.valid('query');

      const res = id
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
