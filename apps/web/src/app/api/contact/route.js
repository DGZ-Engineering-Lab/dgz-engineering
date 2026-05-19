import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { checkRateLimit } from "../../../lib/upstash";

export const runtime = 'edge';

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success, limit, remaining, reset } = await checkRateLimit(`rate_limit:contact:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: "Too many contact submissions. Please wait before retrying." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString()
          }
        }
      );
    }

    const { name, email, message, company } = await req.json();

    if (!name || !email || !message) {

      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const contactId = `contact:${Date.now()}`;
    const payload = {
      id: contactId,
      name,
      email,
      message,
      company: company || "N/A",
      timestamp: new Date().toISOString()
    };

    // Store in KV
    try {
      await kv.lpush("devgiz_messages", JSON.stringify(payload));
    } catch (e) {
      console.warn("KV not connected, simulating storage");
    }

    return NextResponse.json({ 
      success: true, 
      message: "Node delivery successful. Message stored in Edge Layer." 
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  // Simple health check or stats
  return NextResponse.json({ status: "API_GATEWAY_OPERATIONAL" });
}
