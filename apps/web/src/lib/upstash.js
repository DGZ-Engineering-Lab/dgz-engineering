import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

let redis = null;
let ratelimit = null; // limitador por defecto (retrocompatible): 10 req / 10 s
const limiters = new Map(); // limitadores por nombre → prefijo `rl:${name}`

// La integración Upstash de Vercel puede exponer las credenciales como UPSTASH_* o KV_*.
const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

if (url && token) {
  try {
    redis = new Redis({
      url,
      token,
    });

    // Rate limit por defecto: 10 peticiones cada 10 segundos por identificador.
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: false, // analytics consume comandos extra del plan gratuito
      prefix: '@upstash/ratelimit',
    });
    console.log('🚀 Upstash Redis & Rate Limiter initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Upstash Redis:', error);
    redis = null;
    ratelimit = null;
  }
} else {
  console.warn('⚠️ Upstash environment variables are missing. Rate limiting is bypassed in development.');
}

// Producción real: en Vercel solo VERCEL_ENV=production (los Preview no cuentan).
export function isProductionEnv() {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === 'production';
  return process.env.NODE_ENV === 'production';
}

// Devuelve (y memoriza) el limitador asociado a `name`. Un nombre = una configuración.
function getNamedLimiter(name, tokens, window) {
  let limiter = limiters.get(name);
  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(tokens, /** @type {any} */ (window)),
      analytics: false,
      prefix: `rl:${name}`,
    });
    limiters.set(name, limiter);
  }
  return limiter;
}

function allowResult(tokens, windowMs = 10000) {
  return { success: true, limit: tokens, remaining: tokens, reset: Date.now() + windowMs };
}

function denyResult(tokens, reason) {
  return { success: false, limit: tokens, remaining: 0, reset: Date.now() + 60000, reason };
}

/**
 * Comprueba el rate limit de un identificador (normalmente la IP).
 *
 * - Sin opciones: limitador por defecto (10 / 10 s), comportamiento histórico.
 * - Con `name`: limitador propio con prefijo `rl:${name}` y ventana `tokens`/`window`.
 * - `failClosed`: si Redis falla, deniega. Si Redis no está configurado, deniega
 *   solo en producción; en desarrollo/preview se deja pasar.
 *
 * @param {string} identifier
 * @param {{ name?: string, tokens?: number, window?: string, failClosed?: boolean }} [options]
 * @returns {Promise<{ success: boolean, limit: number, remaining: number, reset: number, reason?: string }>}
 */
export async function checkRateLimit(identifier, options = {}) {
  const { name, tokens = 10, window = '10 s' } = options;
  // El cierre ante fallo de Redis es opcional (RATE_LIMIT_FAIL_CLOSED=1): activarlo solo
  // tras comprobar que Redis responde, o una caída de Upstash tumbaría contacto/IA/subidas.
  const failClosed = Boolean(options.failClosed) && process.env.RATE_LIMIT_FAIL_CLOSED === '1';

  if (!redis) {
    if (failClosed && isProductionEnv()) {
      console.error(`❌ Rate limiter "${name || 'default'}" sin Redis en producción: petición denegada.`);
      return denyResult(tokens, 'unavailable');
    }
    return allowResult(tokens);
  }

  try {
    const limiter = name ? getNamedLimiter(name, tokens, window) : ratelimit;
    return await limiter.limit(identifier);
  } catch (error) {
    if (failClosed) {
      console.error(`❌ Upstash rate limiting error (${name || 'default'}), failing closed:`, error);
      return denyResult(tokens, 'unavailable');
    }
    console.error('⚠️ Upstash rate limiting error, bypassing:', error);
    return allowResult(tokens);
  }
}

/**
 * Presupuesto diario global (no por IP) para acotar costes: contador `budget:<key>:<YYYY-MM-DD>`
 * con INCR + EXPIRE en el primer uso. Sin Redis o ante error deja pasar: el rate limit
 * fail-closed que se ejecuta antes ya cubre la caída de Redis.
 *
 * @param {string} key
 * @param {number} max
 * @returns {Promise<{ allowed: boolean, count: number, max: number }>}
 */
export async function dailyBudget(key, max) {
  if (!redis) return { allowed: true, count: 0, max };
  const day = new Date().toISOString().slice(0, 10);
  const counterKey = `budget:${key}:${day}`;
  try {
    const count = Number(await redis.incr(counterKey));
    if (count === 1) {
      await redis.expire(counterKey, 60 * 60 * 48); // margen de sobra para cambiar de día
    }
    return { allowed: count <= max, count, max };
  } catch (error) {
    console.error(`⚠️ Daily budget error for ${key}, bypassing:`, error);
    return { allowed: true, count: 0, max };
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
