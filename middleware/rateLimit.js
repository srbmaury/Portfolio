import { Redis } from '@upstash/redis';
import { sha256hex } from '../services/cacheService.js';

const redis =
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const WINDOW = 60 * 60;
const MAX = 10;

export async function rateLimitMiddleware(req, res, next) {
  try {
    if (!redis) return next();

    const ip = req.ip || 'unknown';
    const key = `ratelimit:${sha256hex(ip)}`;

    const count = await redis.incr(key);

    if (count === 1) {
      await redis.expire(key, WINDOW);
    }

    if (count > MAX) {
      const ttl = await redis.ttl(key);
      const retryAfter = ttl > 0 ? ttl : WINDOW;

      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({
        error: 'Too many requests',
        retryAfter,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
}
