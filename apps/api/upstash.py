import os
import json
import logging
from functools import wraps
from fastapi import Request, HTTPException
from starlette.concurrency import run_in_threadpool
from upstash_redis import Redis

# Setup Logging
logger = logging.getLogger("dgz_upstash")
logging.basicConfig(level=logging.INFO)

# Retrieve Upstash credentials
UPSTASH_URL = os.getenv("UPSTASH_REDIS_REST_URL")
UPSTASH_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN")
REDIS_CONFIGURED = bool(UPSTASH_URL and UPSTASH_TOKEN)

# Initialize redis client if keys are present
redis_client = None
if REDIS_CONFIGURED:
    try:
        redis_client = Redis(url=UPSTASH_URL, token=UPSTASH_TOKEN)
        logger.info("🚀 Upstash Redis client initialized successfully.")
    except Exception:
        logger.exception("❌ Failed to initialize Upstash Redis")
else:
    logger.warning("⚠️ Upstash credentials missing. Rate limiting and caching will be bypassed.")


class RateLimitUnavailable(Exception):
    """Redis configurado pero inaccesible."""


def is_rate_limited(key: str, limit: int = 15, window: int = 60) -> bool:
    """
    Contador de ventana fija en Redis (síncrono: se ejecuta en threadpool).
    Devuelve False si Redis no está configurado; lanza RateLimitUnavailable si falla.
    """
    if not REDIS_CONFIGURED:
        return False
    if redis_client is None:
        raise RateLimitUnavailable("Redis client not initialized")

    try:
        current = redis_client.incr(key)
        if current == 1:
            redis_client.expire(key, window)
        elif redis_client.ttl(key) == -1:
            # Clave sin TTL (p.ej. expire falló antes): evita un bloqueo permanente
            redis_client.expire(key, window)
        return current > limit
    except Exception as e:
        logger.error(f"⚠️ Redis rate limit check failed: {e}")
        raise RateLimitUnavailable(str(e))


def _client_ip(request: Request) -> str:
    # No se confía en cf-connecting-ip / x-forwarded-for enviados por el cliente:
    # uvicorn (--proxy-headers) resuelve request.client a partir del proxy de Render.
    return request.client.host if request.client else "unknown"


def rate_limiter(limit: int = 15, window: int = 60, scope: str = "default", fail_closed: bool = False):
    """
    FastAPI Route Dependency to enforce rate limits per client IP.
    fail_closed=True: si Redis está configurado y falla, responde 503 (endpoints caros).
    """
    def dependency(request: Request):
        ip = _client_ip(request)
        key = f"rate_limit:{scope}:{ip}"
        try:
            limited = is_rate_limited(key, limit, window)
        except RateLimitUnavailable:
            if fail_closed:
                raise HTTPException(status_code=503, detail="Servicio temporalmente no disponible.")
            return
        if limited:
            logger.warning(f"🚫 IP {ip} exceeded rate limit of {limit} requests per {window}s ({scope}).")
            raise HTTPException(status_code=429, detail="Too Many Requests. Rate limit exceeded.")

    return dependency


def _is_simulated(result) -> bool:
    """Las respuestas simuladas/de contingencia no se cachean."""
    if isinstance(result, dict):
        if result.get("simulated") is True:
            return True
        return str(result.get("source", "")).startswith("DGZ_SIMULATED")
    return False


def cache_response(ttl_seconds: int = 300):
    """
    Decorator to cache JSON responses for GET endpoints in FastAPI.
    Soporta endpoints async y síncronos (estos últimos se ejecutan en threadpool).
    """
    def decorator(func):
        import asyncio
        is_async = asyncio.iscoroutinefunction(func)

        async def call(*args, **kwargs):
            if is_async:
                return await func(*args, **kwargs)
            return await run_in_threadpool(func, *args, **kwargs)

        @wraps(func)
        async def wrapper(*args, **kwargs):
            if not redis_client:
                return await call(*args, **kwargs)

            # Formulate cache key based on function name and args
            arg_str = ":".join(str(v) for v in kwargs.values() if isinstance(v, (str, int, float)))
            cache_key = f"cache:{func.__name__}:{arg_str}"

            try:
                cached_val = await run_in_threadpool(redis_client.get, cache_key)
                if cached_val:
                    logger.info(f"⚡ Cache Hit for {cache_key}")
                    try:
                        return json.loads(cached_val)
                    except (json.JSONDecodeError, TypeError):
                        return cached_val
            except Exception as e:
                logger.error(f"⚠️ Cache read error: {e}")

            # Execute original function
            result = await call(*args, **kwargs)

            if not _is_simulated(result):
                try:
                    await run_in_threadpool(redis_client.set, cache_key, json.dumps(result), ex=ttl_seconds)
                    logger.info(f"💾 Cached new result for {cache_key}")
                except Exception as e:
                    logger.error(f"⚠️ Cache write error: {e}")

            return result
        return wrapper
    return decorator
