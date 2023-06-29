import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import { fetchLanguage, updateLanguage } from '@/libs/api/setting';
import { LanguageSchema } from '@/schema/generated/prisma';
import { createApiActionResponse400 } from '@/utils/api';

export const settings = new Hono()
  .get('/language', async (c) => {
    const res = await fetchLanguage();
    return c.jsonT(res, res.status);
  })
  .post(
    '/language',
    zValidator(
      'json',
      z.object({
        language: LanguageSchema,
      }),
      (result, c) => {
        if (!result.success) {
          const res = createApiActionResponse400(result.error.message);
          return c.json(res, res.status);
        }
      }
    ),
    async (c) => {
      const { language } = c.req.valid('json');

      const res = await updateLanguage({ language });
      return c.jsonT(res, res.status);
    }
  );
