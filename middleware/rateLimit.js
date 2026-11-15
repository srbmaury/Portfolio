import 'dotenv/config';
import { Redis } from '@upstash/redis';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';

const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = process.env;
const redis = url && token ? new Redis({
  url,
  token,
  retry: false,
  signal: () => AbortSignal.timeout(2500),
}) : null;

const sendRedisCommand = (command, ...args) => {
  switch (command) {
    case 'SCRIPT':
      return redis.scriptLoad(args[1]);
    case 'EVALSHA': {
      const [sha, count, ...parameters] = args;
      const keyCount = Number(count);
      return redis.evalsha(sha, parameters.slice(0, keyCount), parameters.slice(keyCount));
    }
    case 'DECR':
      return redis.decr(args[0]);
    case 'DEL':
      return redis.del(args[0]);
    default:
      throw new Error(`Unsupported rate limit Redis command: ${command}`);
  }
};

function createRateLimiter(limit, prefix) {
  const config = {
    windowMs: 60 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler(req, res) {
      const resetTime = req.rateLimit.resetTime?.getTime() ?? Date.now() + config.windowMs;
      const retryAfter = Math.max(1, Math.ceil((resetTime - Date.now()) / 1000));
      res.set('Retry-After', String(retryAfter));
      res.status(429).json({ error: 'Too many requests', retryAfter });
    },
  };
  const localLimiter = rateLimit(config);
  if (!redis) return localLimiter;

  const sharedLimiter = rateLimit({
    ...config,
    store: new RedisStore({ prefix, sendCommand: sendRedisCommand }),
  });

  let retrySharedAfter = 0;
  return (req, res, next) => {
    if (Date.now() < retrySharedAfter) return localLimiter(req, res, next);

    return sharedLimiter(req, res, error => {
      if (!error) return next();
      if (Date.now() >= retrySharedAfter) console.warn('Shared rate limiter unavailable, using local limits');
      retrySharedAfter = Date.now() + 30_000;
      return localLimiter(req, res, next);
    });
  };
}

export const rateLimitMiddleware = createRateLimiter(10, 'portfolio:ratelimit:');
export const githubRateLimitMiddleware = createRateLimiter(60, 'portfolio:github-ratelimit:');
