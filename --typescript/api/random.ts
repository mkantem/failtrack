import { Hono } from 'hono';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

app.get('/api/random', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM failures ORDER BY RANDOM() LIMIT 1').all();
  if (results.length === 0) return c.json({ error: 'No failures found' }, 404);
  return c.json(results[0]);
});

export default app; 