import { NextResponse } from "next/server";

/**
 * Best-effort client IP for rate limiting. Prefers the Cloudflare header,
 * then the first hop of X-Forwarded-For (set by Vercel), then `fallback`.
 */
export function getClientIp(req, fallback = "127.0.0.1") {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0].trim();
    if (first) return first;
  }
  return fallback;
}

/**
 * Logs the real error server-side and returns a generic 500 so internal
 * details (stack traces, provider messages, env names) never reach clients.
 */
export function internalError(error, context = "API") {
  console.error(`❌ [${context}]`, error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
