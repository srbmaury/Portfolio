import { Redis } from '@upstash/redis';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

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
const localRateLimiter = rateLimit({
  windowMs: WINDOW * 1000,
  limit: MAX,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
const redisRateLimiter = redis
  ? rateLimit({
      windowMs: WINDOW * 1000,
      limit: MAX,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: async (command, ...args) => {
          const response = await redis.client.request({
            path: [command, ...args].map(encodeURIComponent),
            body: null,
          });
          if (response.error) throw new Error(response.error);
          return response.result;
        },
        prefix: 'portfolio:ratelimit:',
      }),
    })
  : null;

export const rateLimitMiddleware = redisRateLimiter || localRateLimiter;

export const githubRateLimitMiddleware = redis
  ? rateLimit({
      windowMs: 60 * 60 * 1000,
      limit: 60,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: async (command, ...args) => {
          const response = await redis.client.request({
            path: [command, ...args].map(encodeURIComponent),
            body: null,
          });
          if (response.error) throw new Error(response.error);
          return response.result;
        },
        prefix: 'portfolio:github-ratelimit:',
      }),
    })
  : rateLimit({
      windowMs: 60 * 60 * 1000,
      limit: 60,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
    });
