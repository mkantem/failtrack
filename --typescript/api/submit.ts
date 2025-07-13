import { Hono } from 'hono';
import { z } from 'zod';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

const schema = z.object({
  story: z.string().min(30).max(1000),
  tags: z.string().optional(),
  discipline: z.string().optional(),
  year: z.string().optional(),
  pseudonym: z.string().optional(),
  language: z.enum(['en', 'fr'])
});

function sanitize(input: string) {
  return input.replace(/[<>]/g, '');
}

app.post('/api/submit', async (c) => {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const last = await c.env.DB.get(`ratelimit:${ip}`);
  if (last && now - Number(last) < 60000) {
    return c.json({ error: 'Rate limit exceeded' }, 429);
  }
  const body = await c.req.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return c.json({ error: 'Invalid input' }, 400);
  }
  const data = result.data;
  await c.env.DB.put(`ratelimit:${ip}`, now.toString(), { expirationTtl: 60 });
  await c.env.DB.prepare(
    'INSERT INTO failures (story, tags, discipline, year, pseudonym, language) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(
    sanitize(data.story),
    sanitize(data.tags || ''),
    sanitize(data.discipline || ''),
    sanitize(data.year || ''),
    sanitize(data.pseudonym || ''),
    data.language
  ).run();
  return c.json({ success: true });
});

export default app; 