import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

import {
  decreaseOrder,
  fetchCurrentVideo,
  fetchQueue,
  interruptToQueue,
  pushToQueue,
} from '@/libs/api/queue';
import {
  ChannelSchema,
  UserSchema,
  VideoSchema,
} from '@/schema/generated/prisma';
import { createApiActionResponse400 } from '@/utils/api';

export const queue = new Hono()
  .get('/', async (c) => {
    const res = await fetchQueue();
    return c.jsonT(res, res.status);
  })
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        channel: ChannelSchema,
        video: VideoSchema,
        user: UserSchema,
        isInterrupt: z.boolean().optional().default(false),
      }),
      (result, c) => {
        if (!result.success) {
          const res = createApiActionResponse400(result.error.message);
          return c.json(res, res.status);
        }
      }
    ),
    async (c) => {
      const { channel, video, user, isInterrupt } = c.req.valid('json');

      const res = isInterrupt
        ? await interruptToQueue({ channel, video, user })
        : await pushToQueue({ channel, video, user });
      return c.jsonT(res, res.status);
    }
  )
  .patch('/decrease-order', async (c) => {
    const res = await decreaseOrder();
    return c.jsonT(res, res.status);
  })
  .get('/current', async (c) => {
    const res = await fetchCurrentVideo();
    return c.jsonT(res, res.status);
  });
