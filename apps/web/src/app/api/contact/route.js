import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { checkRateLimit } from "../../../lib/upstash";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;


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

    // Dispatch Email using Resend (Phase 3)
    let emailSent = false;
    if (resend) {
      try {
        await resend.emails.send({
          from: 'DevGiz Platform <onboarding@resend.dev>',
          to: ['Albertg2109@gmail.com'],
          subject: `[DevGiz Contact] Nuevo contacto: ${name}`,
          html: `
            <h3>Nuevo mensaje desde DevGiz Engineering</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Compañía:</strong> ${company || "N/A"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          `
        });
        emailSent = true;
        console.log("✉️ Transactional contact email dispatched via Resend.");
      } catch (err) {
        console.error("⚠️ Resend email dispatch failed:", err);
      }
    } else {
      console.warn("⚠️ RESEND_API_KEY not configured. Skipping transactional email.");
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
