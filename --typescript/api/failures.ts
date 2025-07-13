import { Hono } from 'hono';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

app.get('/api/failures', async (c) => {
  const { page = '1', pageSize = '10', keyword = '', tag = '', language = '' } = c.req.query();
  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  let sql = 'SELECT * FROM failures WHERE 1=1';
  const params: any[] = [];
  if (keyword) {
    sql += ' AND story LIKE ?';
    params.push(`%${keyword}%`);
  }
  if (tag) {
    sql += ' AND tags LIKE ?';
    params.push(`%${tag}%`);
  }
  if (language) {
    sql += ' AND language = ?';
    params.push(language);
  }
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(parseInt(pageSize), offset);
  const { results } = await c.env.DB.prepare(sql).bind(...params).all();
  return c.json(results);
});

export default app; 