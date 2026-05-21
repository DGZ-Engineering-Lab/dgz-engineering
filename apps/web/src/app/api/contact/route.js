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
        // 1. Send admin notification email
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
        console.log("✉️ Transactional contact email dispatched to admin via Resend.");
        
        // 2. Send premium confirmation email to the sender
        // Wrapped in separate try-catch because on Resend free tier (onboarding@resend.dev) 
        // sending to non-verified emails will fail unless the domain is verified.
        try {
          await resend.emails.send({
            from: 'DevGiz Engineering <onboarding@resend.dev>',
            to: [email],
            subject: `¡Gracias por contactar a DevGiz, ${name}!`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background-color: #030712; color: #f3f4f6; margin: 0; padding: 40px 20px; }
                  .card { max-width: 600px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
                  .header { padding: 30px; background: linear-gradient(135deg, #0e1e38 0%, #020617 100%); border-bottom: 1px solid #1e293b; text-align: center; }
                  .logo { font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #22d3ee; text-decoration: none; font-family: system-ui, sans-serif; }
                  .content { padding: 40px 30px; line-height: 1.6; }
                  h1 { font-size: 20px; font-weight: 700; color: #ffffff; margin-top: 0; }
                  p { color: #94a3b8; font-size: 14px; }
                  .accent { color: #22d3ee; font-weight: 600; }
                  .details { background-color: #030712; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; margin: 25px 0; }
                  .detail-item { margin-bottom: 10px; font-size: 13px; font-family: monospace; }
                  .detail-label { color: #64748b; }
                  .detail-val { color: #f3f4f6; }
                  .footer { padding: 20px; text-align: center; background-color: #030712; border-top: 1px solid #1e293b; font-size: 11px; color: #475569; }
                </style>
              </head>
              <body>
                <div class="card">
                  <div class="header">
                    <span class="logo font-weight: 800; color: #22d3ee;">DEVGIZ ENGINEERING</span>
                  </div>
                  <div class="content">
                    <h1>¡Gracias por contactar con DevGiz, <span class="accent">${name}</span>!</h1>
                    <p>Hemos recibido tu solicitud de información sobre nuestra suite de <strong>Inteligencia Territorial y Catastro Multipropósito</strong>.</p>
                    <p>Un ingeniero geoespacial de nuestro equipo revisará tu caso y se pondrá en contacto contigo en un plazo de 24 horas hábiles.</p>
                    
                    <div class="details">
                      <div class="detail-item"><span class="detail-label">Remitente:</span> <span class="detail-val">${name}</span></div>
                      <div class="detail-item"><span class="detail-label">Compañía:</span> <span class="detail-val">${company || 'N/A'}</span></div>
                      <div class="detail-item"><span class="detail-label">Mensaje recibido:</span></div>
                      <p style="margin: 5px 0 0 0; font-style: italic; color: #94a3b8; font-size: 13px;">"${message}"</p>
                    </div>
                    
                    <p>Mientras tanto, puedes explorar nuestro laboratorio interactivo de IA y visor catastral 3D.</p>
                  </div>
                  <div class="footer">
                    © 2026 DevGiz Engineering. Soluciones Soberanas de Inteligencia Territorial.<br>
                    Este es un correo automático de confirmación.
                  </div>
                </div>
              </body>
              </html>
            `
          });
          console.log("✉️ Transactional confirmation email dispatched to sender via Resend.");
        } catch (senderErr) {
          console.warn("⚠️ Resend confirmation email to sender skipped or failed (common on free tier without custom domain):", senderErr.message);
        }
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
