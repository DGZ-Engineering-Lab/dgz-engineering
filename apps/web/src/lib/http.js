import { NextResponse } from "next/server";

/**
 * Logs the real error server-side and returns a generic 500 so internal
 * details (stack traces, provider messages, env names) never reach clients.
 */
export function internalError(error, context = "API") {
  console.error(`❌ [${context}]`, error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
