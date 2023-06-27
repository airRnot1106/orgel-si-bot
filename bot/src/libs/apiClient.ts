import { hc } from 'hono/client';

import type { ApiType } from '@/server';

import { envSchema } from '@/schema/env';

const env = envSchema.parse(process.env);
const baseUrl = env.API_ENDPOINT;
const headers = {
  'Content-Type': 'application/json',
};

export const apiClient = hc<ApiType>(baseUrl, {
  headers,
});
