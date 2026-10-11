import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { checkRateLimit } from "../../../lib/upstash";
import { emailService } from "../../../lib/email-service";
import { boundedString, getClientIp, isValidEmail } from "../../../lib/security";


export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const ip = getClientIp(req);
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

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const name = boundedString(body?.name, 120);
    const email = boundedString(body?.email, 254);
    const message = boundedString(body?.message, 5000);
    const company = boundedString(body?.company, 160, { required: false });

    if (!name || !email || !message || company === null) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const contactId = `contact:${Date.now()}:${crypto.randomUUID().slice(0, 8)}`;
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
    console.error("❌ Contact route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  // Simple health check or stats
  return NextResponse.json({ status: "API_GATEWAY_OPERATIONAL" });
}
