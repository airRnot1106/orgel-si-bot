import { Hono } from 'hono';

import { fetchSettings } from '@/libs/api/setting';

export const settings = new Hono().get('/', async (c) => {
  const res = await fetchSettings();
  return c.jsonT(res, res.status);
});
