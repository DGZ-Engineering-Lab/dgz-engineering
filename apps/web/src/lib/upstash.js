import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

let redis = null;
let ratelimit = null;

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (url && token) {
  try {
    redis = new Redis({
      url,
      token,
    });

    // Rate limit: 10 requests per 10 seconds per IP address
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    });
    console.log('🚀 Upstash Redis & Rate Limiter initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Upstash Redis:', error);
  }
} else {
  console.warn('⚠️ Upstash environment variables are missing. Rate limiting is bypassed in development.');
}

/**
 * Perform a rate limit check on a given identifier (usually IP address).
 * Bypasses and returns { success: true } if Upstash is not configured.
 */
export async function checkRateLimit(identifier) {
  if (!ratelimit) {
    return { success: true, limit: 10, remaining: 10, reset: Date.now() + 10000 };
  }
  try {
    return await ratelimit.limit(identifier);
  } catch (error) {
    console.error('⚠️ Upstash rate limiting error, bypassing:', error);
    return { success: true, limit: 10, remaining: 10, reset: Date.now() + 10000 };
  }
}

/**
 * Read or write cache using Redis.
 * Bypasses and runs original function if Redis is not configured.
 */
export async function cacheWrap(key, ttlSeconds, fn) {
  if (!redis) {
    return await fn();
  }
  try {
    const cached = await redis.get(key);
    if (cached) {
      console.log(`⚡ Cache Hit for key: ${key}`);
      return typeof cached === 'string' ? JSON.parse(cached) : cached;
    }
  } catch (error) {
    console.error(`⚠️ Cache read error for key ${key}:`, error);
  }

  const result = await fn();

  try {
    await redis.set(key, JSON.stringify(result), { ex: ttlSeconds });
    console.log(`💾 Cache Saved for key: ${key}`);
  } catch (error) {
    console.error(`⚠️ Cache write error for key ${key}:`, error);
  }

  return result;
}

export { redis, ratelimit };
