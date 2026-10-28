import { createHash } from "node:crypto";
import { Resend } from "resend";
import { getAdminNotificationTemplate, getUserConfirmationTemplate } from "./email-templates.js";
import { maskEmail, singleLine } from "./security.js";
import { redis } from "./upstash.js";

// Texto fijo: la confirmación nunca refleja el mensaje libre del visitante
// (evita usar el formulario como relé de spam/phishing hacia terceros).
const CONFIRMATION_MESSAGE =
  "Tu solicitud quedó registrada. Por seguridad no reproducimos aquí el contenido de tu mensaje.";
const CONFIRMATION_COOLDOWN_SECONDS = 24 * 60 * 60;

class EmailService {
  constructor() {
    this.resendApiKey = process.env.RESEND_API_KEY;
    this.audienceId = process.env.RESEND_AUDIENCE_ID;
    
    // On Free Tier, fromEmail MUST be onboarding@resend.dev
    this.fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    // Sin valor por defecto: si falta RESEND_ADMIN_EMAIL no se envía la notificación.
    this.adminEmail = process.env.RESEND_ADMIN_EMAIL || null;
    
    this.resend = this.resendApiKey ? new Resend(this.resendApiKey) : null;

    if (!this.resendApiKey) {
      console.warn("⚠️ RESEND_API_KEY is not configured. EmailService will simulate dispatch.");
    }
  }

  /**
   * Sends an internal notification to the DevGiz Admin team.
   */
  async sendAdminNotification({ name, email, message, company, consent }) {
    if (!this.resend) {
      console.log("[EmailService] Simulated Admin Notification: new contact received");
      return { simulated: true };
    }
    if (!this.adminEmail) {
      console.warn("⚠️ RESEND_ADMIN_EMAIL is not configured. Skipping admin notification.");
      return { skipped: true, reason: "missing_admin_email" };
    }

    try {
      const response = await this.resend.emails.send({
        from: this.fromEmail,
        to: [this.adminEmail],
        subject: `[DevGiz Contact] Nuevo contacto: ${singleLine(name)}`,
        html: getAdminNotificationTemplate({ name, email, message, company, consent })
      });
      
      console.log("✉️ Transactional contact email dispatched to admin via Resend.");
      return response;
    } catch (error) {
      console.error("⚠️ Failed to send admin notification:", error.message);
      // We don't throw here to avoid failing the whole API call just because admin notification failed
      return { error: error.message };
    }
  }

  /**
   * Sends a premium confirmation email to the user.
   */
  async sendUserConfirmation({ name, email }) {
    if (!this.resend) {
      console.log(`[EmailService] Simulated User Confirmation to ${maskEmail(email)}`);
      return { simulated: true };
    }

    // VERY IMPORTANT: On Resend Free Tier without a custom domain, 
    // you can ONLY send emails to the verified account email.
    // If we attempt to send to the user's email, Resend will reject it.
    if (this.fromEmail === "onboarding@resend.dev" && email !== this.adminEmail) {
      console.warn(`⚠️ [EmailService] Skipping User Confirmation to ${maskEmail(email)}: Free Tier only allows sending to the verified admin email.`);
      return { simulated: true, reason: "free_tier_restriction" };
    }

    // Máximo 1 confirmación por destinatario cada 24 h (SET NX EX sobre un hash del email).
    if (redis) {
      try {
        const digest = createHash("sha256").update(String(email).toLowerCase()).digest("hex");
        const fresh = await redis.set(`email:confirm:${digest}`, "1", {
          nx: true,
          ex: CONFIRMATION_COOLDOWN_SECONDS,
        });
        if (fresh === null) {
          return { skipped: true, reason: "cooldown" };
        }
      } catch (error) {
        console.warn("⚠️ Confirmation cooldown check failed, skipping confirmation:", error.message);
        return { skipped: true, reason: "cooldown_unavailable" };
      }
    }

    try {
      // Solo se refleja el nombre (acotado); empresa y mensaje no se reenvían al destinatario.
      const safeName = singleLine(name).slice(0, 60);
      const emailHtml = getUserConfirmationTemplate({
        name: safeName,
        message: CONFIRMATION_MESSAGE,
        company: undefined,
      });

      const response = await this.resend.emails.send({
        from: this.fromEmail,
        to: [email],
        subject: `¡Gracias por contactar a DevGiz, ${safeName}!`,
        html: emailHtml
      });

      console.log("✉️ Transactional confirmation email dispatched to sender via Resend.");
      return response;
    } catch (error) {
      console.warn("⚠️ Resend confirmation email failed.", error.message);
      return { error: error.message };
    }
  }

  /**
   * Adds a user to the Resend Audience for future Broadcasts.
   * Solo con consentimiento explícito (`consent === true`, casilla en el formulario).
   */
  async addContactToAudience({ firstName, email, consent = false }) {
    if (consent !== true) {
      return { skipped: true, reason: "no_consent" };
    }
    if (!this.resend) {
      console.log(`[EmailService] Simulated Adding Contact to Audience: ${maskEmail(email)}`);
      return { simulated: true };
    }

    try {
      // If no audienceId is explicitly configured, try to fetch the default one "General"
      if (!this.audienceId) {
        console.log("[EmailService] No RESEND_AUDIENCE_ID found, attempting to fetch default segment...");
        // Resend 6 replaced audiences with segments; existing audience ids are valid segment ids.
        const audiencesRes = await this.resend.segments.list();
        if (audiencesRes.data && audiencesRes.data.data.length > 0) {
          this.audienceId = audiencesRes.data.data[0].id;
        } else {
          console.warn("⚠️ No audiences found in Resend account. Cannot add contact.");
          return { error: "No audience found" };
        }
      }

      const response = await this.resend.contacts.create({
        email: email,
        firstName: firstName,
        unsubscribed: false,
        segments: [{ id: this.audienceId }],
      });
      
      console.log(`👥 Contact ${maskEmail(email)} added to Resend Audience successfully.`);
      return response;
    } catch (error) {
      console.error("⚠️ Failed to add contact to Audience:", error.message);
      return { error: error.message };
    }
  }
}

// Export a singleton instance of the service
export const emailService = new EmailService();
