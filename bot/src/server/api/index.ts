import { Hono } from 'hono';

export const root = new Hono().get('/', (c) => c.text('Hello Hono!'));
