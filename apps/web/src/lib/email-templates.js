import { escapeHtml } from "./html.js";

/**
 * Generates the HTML template for internal Admin notifications.
 */
export function getAdminNotificationTemplate({ name, email, message, company }) {
  return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; padding: 20px;">
      <h2 style="color: #333;">Nuevo Lead desde DevGiz Engineering</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
      <p><strong>Compañía:</strong> ${escapeHtml(company || "N/A")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <div style="background-color: #f9f9f9; padding: 15px; margin-top: 20px; border-radius: 5px;">
        <p style="margin: 0; font-style: italic;">"${escapeHtml(message)}"</p>
      </div>
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      <p style="font-size: 12px; color: #888;">Este es un mensaje automático generado por la plataforma DevGiz.</p>
    </div>
  `;
}

/**
 * Generates the HTML template for confirming receipt to the user.
 * NOTE: On Resend Free Tier, this will only work if the user's email matches the verified admin email.
 */
export function getUserConfirmationTemplate({ name, message, company }) {
  return `
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
          <span class="logo">DEVGIZ ENGINEERING</span>
        </div>
        <div class="content">
          <h1>¡Gracias por contactar con DevGiz, <span class="accent">${escapeHtml(name)}</span>!</h1>
          <p>Hemos recibido tu solicitud de información sobre nuestra suite de <strong>Inteligencia Territorial y Catastro Multipropósito</strong>.</p>
          <p>Un ingeniero geoespacial de nuestro equipo revisará tu caso y se pondrá en contacto contigo en un plazo de 24 horas hábiles.</p>
          
          <div class="details">
            <div class="detail-item"><span class="detail-label">Remitente:</span> <span class="detail-val">${escapeHtml(name)}</span></div>
            <div class="detail-item"><span class="detail-label">Compañía:</span> <span class="detail-val">${escapeHtml(company || 'N/A')}</span></div>
            <div class="detail-item"><span class="detail-label">Mensaje recibido:</span></div>
            <p style="margin: 5px 0 0 0; font-style: italic; color: #94a3b8; font-size: 13px;">"${escapeHtml(message)}"</p>
          </div>
          
          <p>Mientras tanto, puedes explorar nuestro laboratorio interactivo de IA y visor catastral 3D.</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} DevGiz Engineering. Soluciones Soberanas de Inteligencia Territorial.<br>
          Este es un correo automático de confirmación.
        </div>
      </div>
    </body>
    </html>
  `;
}
