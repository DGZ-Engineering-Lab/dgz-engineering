import os
import logging
from functools import wraps
from fastapi import Request, HTTPException
from upstash_redis import Redis

# Setup Logging
logger = logging.getLogger("dgz_upstash")
logging.basicConfig(level=logging.INFO)

# Retrieve Upstash credentials
UPSTASH_URL = os.getenv("UPSTASH_REDIS_REST_URL")
UPSTASH_TOKEN = os.getenv("UPSTASH_REDIS_REST_TOKEN")

# Initialize redis client if keys are present
redis_client = None
if UPSTASH_URL and UPSTASH_TOKEN:
    try:
        redis_client = Redis(url=UPSTASH_URL, token=UPSTASH_TOKEN)
        logger.info("🚀 Upstash Redis client initialized successfully.")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Upstash Redis: {str(e)}")
else:
    logger.warning("⚠️ Upstash credentials missing. Rate limiting and caching will be bypassed.")

async def is_rate_limited(ip: str, limit: int = 15, window: int = 60) -> bool:
    """
    Sliding window rate limiting using Redis.
    Bypasses and returns False if Redis is not configured.
    """
    if not redis_client:
        return False
    
    key = f"rate_limit:{ip}"
    try:
        # We use a transaction pipeline or multi-exec block if available,
        # but a simple atomic increment with TTL is robust and fast.
        current = redis_client.incr(key)
        if current == 1:
            redis_client.expire(key, window)
        
        if current > limit:
            return True
    except Exception as e:
        logger.error(f"⚠️ Redis rate limit check failed: {str(e)}")
    
    return False

def rate_limiter(limit: int = 15, window: int = 60):
    """
    FastAPI Route Dependency to enforce rate limits per client IP.
    """
    async def dependency(request: Request):
        # Extract IP address from headers (handling proxy / Cloudflare)
        ip = request.headers.get("x-forwarded-for")
        if ip:
            ip = ip.split(",")[0].strip()
        else:
            ip = request.client.host if request.client else "127.0.0.1"
            
        if await is_rate_limited(ip, limit, window):
            logger.warning(f"🚫 IP {ip} exceeded rate limit of {limit} requests per {window}s.")
            raise HTTPException(status_code=429, detail="Too Many Requests. Rate limit exceeded.")
            
    return dependency

def cache_response(ttl_seconds: int = 300):
    """
    Decorator to cache JSON responses for GET endpoints in FastAPI.
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            if not redis_client:
                return await func(*args, **kwargs)
            
            # Formulate cache key based on function name and args
            # Simple string representation of arguments for uniqueness
            arg_str = ":".join(str(v) for v in kwargs.values() if isinstance(v, (str, int, float)))
            cache_key = f"cache:{func.__name__}:{arg_str}"
            
            try:
                cached_val = redis_client.get(cache_key)
                if cached_val:
                    logger.info(f"⚡ Cache Hit for {cache_key}")
                    # Convert string/JSON string back if it was stored as JSON
                    import json
                    try:
                        return json.loads(cached_val)
                    except json.JSONDecodeError:
                        return cached_val
            except Exception as e:
                logger.error(f"⚠️ Cache read error: {str(e)}")
            
            # Execute original function
            result = await func(*args, **kwargs)
            
            try:
                import json
                redis_client.set(cache_key, json.dumps(result), ex=ttl_seconds)
                logger.info(f"💾 Cached new result for {cache_key}")
            except Exception as e:
                logger.error(f"⚠️ Cache write error: {str(e)}")
                
            return result
        return wrapper
    return decorator
