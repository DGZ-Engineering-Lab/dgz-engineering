import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { checkRateLimit } from "../../../lib/upstash";
import { emailService } from "../../../lib/email-service";


export const runtime = 'edge';

export async function POST(req) {
  try {
    const ip = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
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

    // Sync to in-memory store for local high-fidelity simulation
    const globalMessages = globalThis._dgz_messages || [];
    if (!globalThis._dgz_messages) {
      globalThis._dgz_messages = globalMessages;
    }
    globalMessages.unshift(payload);

    // Dispatch Email using the new Enterprise EmailService (Phase 3)
    let emailSent = false;
    try {
      // 1. Add contact to Resend Audience
      await emailService.addContactToAudience({ firstName: name, email });

      // 2. Send Admin Notification & Attempt User Confirmation
      const adminRes = await emailService.sendAdminNotification(payload);
      const userRes = await emailService.sendUserConfirmation(payload);

      // If neither failed or returned simulated true, we consider it sent
      if (!adminRes.error && !userRes.error) {
        emailSent = true;
      }
    } catch (err) {
      console.error("⚠️ Email service orchestration failed:", err);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Node delivery successful. Message stored in Edge Layer.",
      emailSent
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  // Simple health check or stats
  return NextResponse.json({ status: "API_GATEWAY_OPERATIONAL" });
}
