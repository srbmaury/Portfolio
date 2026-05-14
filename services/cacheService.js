import crypto from 'crypto';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();

const upstashRedis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const CACHE_TTL = 60 * 60;

export function sha256hex(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

/* ---------------- CAREER CACHE ---------------- */

export async function getCareerCachedResponse(cacheKey) {
  if (!upstashRedis) return null;

  const v = await upstashRedis.get(
    `portfolio:career:${sha256hex(cacheKey)}`
  );

  if (v && typeof v === 'object' && typeof v.response === 'string') {
    return { response: v.response };
  }

  return null;
}

export async function setCareerCachedResponse(cacheKey, response) {
  if (!upstashRedis) return;

  await upstashRedis.set(
    `portfolio:career:${sha256hex(cacheKey)}`,
    { response },
    { ex: CACHE_TTL }
  );
}

/* ---------------- GITHUB CACHE ---------------- */

export async function getGithubCacheEntry(username) {
  if (!upstashRedis) return null;

  const key = username.toLowerCase();
  return await upstashRedis.get(`portfolio:github:v3:${key}`);
}

export async function setGithubCacheEntry(username, payload) {
  if (!upstashRedis) return;

  const key = username.toLowerCase();

  await upstashRedis.set(`portfolio:github:v3:${key}`, payload, {
    ex: 60 * 60 * 24 * 30,
  });
}
