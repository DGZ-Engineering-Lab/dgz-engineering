import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { checkRateLimit, dailyBudget } from "../../../lib/upstash";
import { emailService } from "../../../lib/email-service";
import {
  assertSameOrigin,
  boundedString,
  getClientIp,
  isJsonRequest,
  isValidEmail,
} from "../../../lib/security";


export const runtime = 'nodejs';

const MESSAGES_KEY = "devgiz_messages";
const MAX_STORED_MESSAGES = 1000; // tope de la lista en Redis
const MAX_MEMORY_MESSAGES = 200; // tope del buffer en memoria

export async function POST(req) {
  try {
    // CSRF: solo formularios del propio sitio y cuerpo JSON (fuerza preflight CORS).
    if (!assertSameOrigin(req)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }
    if (!isJsonRequest(req)) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
    }

    const ip = getClientIp(req);
    const { success, limit, remaining, reset, reason } = await checkRateLimit(ip, {
      name: "contact",
      tokens: 3,
      window: "1 h",
      failClosed: true,
    });

    if (!success) {
      return NextResponse.json(
        {
          error: reason === "unavailable"
            ? "Contact service temporarily unavailable. Please try again later."
            : "Too many contact submissions. Please wait before retrying.",
        },
        { 
          status: reason === "unavailable" ? 503 : 429,
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

    // Presupuesto diario global: protege la cuota de Resend y de Redis.
    const budget = await dailyBudget("contact", 40);
    if (!budget.allowed) {
      return NextResponse.json(
        { error: "Daily contact capacity reached. Please try again tomorrow." },
        { status: 429 }
      );
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
      await kv.lpush(MESSAGES_KEY, JSON.stringify(payload));
      await kv.ltrim(MESSAGES_KEY, 0, MAX_STORED_MESSAGES - 1);
    } catch (e) {
      console.warn("KV not connected, simulating storage");
    }

    // Sync to in-memory store for local high-fidelity simulation
    const globalMessages = globalThis._dgz_messages || [];
    if (!globalThis._dgz_messages) {
      globalThis._dgz_messages = globalMessages;
    }
    globalMessages.unshift(payload);
    if (globalMessages.length > MAX_MEMORY_MESSAGES) {
      globalMessages.length = MAX_MEMORY_MESSAGES;
    }

    // Dispatch Email using the new Enterprise EmailService (Phase 3)
    let emailSent = false;
    try {
      // 1. Audiencia de Resend solo con consentimiento explícito (casilla en el formulario).
      await emailService.addContactToAudience({ firstName: name, email, consent: body?.consent === true });

      // 2. Send Admin Notification & Attempt User Confirmation
      // Uniones de retorno heterogéneas (Resend | skipped): se tratan como any para checkJs.
      const adminRes = /** @type {any} */ (await emailService.sendAdminNotification(payload));
      const userRes = /** @type {any} */ (await emailService.sendUserConfirmation(payload));

      // Enviado (o simulado) si la notificación al admin salió y ninguna falló
      if (!adminRes.error && !("skipped" in adminRes) && !userRes.error) {
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
