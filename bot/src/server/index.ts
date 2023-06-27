import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { root } from '@/server/api';
import { settings } from '@/server/api/settings';

const app = new Hono();

const route = app.route('/api', root).route('/api/settings', settings);

serve(route, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${info.port}`);
});

export type ApiType = typeof route;
