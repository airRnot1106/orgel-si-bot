import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import prisma from '@/libs/prisma';
import { root } from '@/server/api';
import { history } from '@/server/api/history';
import { queue } from '@/server/api/queue';
import { settings } from '@/server/api/settings';

const app = new Hono();

const route = app
  .route('/api', root)
  .route('/api/settings', settings)
  .route('/api/queue', queue)
  .route('/api/history', history);

serve(route, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${info.port}`);
});

export type ApiType = typeof route;

(async () => {
  await prisma.setting.upsert({
    where: { key: 'SETTING' },
    update: {},
    create: {
      key: 'SETTING',
      language: 'EN',
    },
  });
})().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
