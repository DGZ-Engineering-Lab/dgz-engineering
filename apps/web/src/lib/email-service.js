import { Resend } from "resend";
import { getAdminNotificationTemplate, getUserConfirmationTemplate } from "./email-templates.js";
import { singleLine } from "./security.js";

class EmailService {
  constructor() {
    this.resendApiKey = process.env.RESEND_API_KEY;
    this.audienceId = process.env.RESEND_AUDIENCE_ID;
    
    // On Free Tier, fromEmail MUST be onboarding@resend.dev
    this.fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    this.adminEmail = process.env.RESEND_ADMIN_EMAIL || "albertg2109@gmail.com";
    
    this.resend = this.resendApiKey ? new Resend(this.resendApiKey) : null;

    if (!this.resendApiKey) {
      console.warn("⚠️ RESEND_API_KEY is not configured. EmailService will simulate dispatch.");
    }
  }

  /**
   * Sends an internal notification to the DevGiz Admin team.
   */
  async sendAdminNotification({ name, email, message, company }) {
    if (!this.resend) {
      console.log(`[EmailService] Simulated Admin Notification: New contact from ${name}`);
      return { simulated: true };
    }

    try {
      const response = await this.resend.emails.send({
        from: this.fromEmail,
        to: [this.adminEmail],
        subject: `[DevGiz Contact] Nuevo contacto: ${singleLine(name)}`,
        html: getAdminNotificationTemplate({ name, email, message, company })
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
  async sendUserConfirmation({ name, email, message, company }) {
    if (!this.resend) {
      console.log(`[EmailService] Simulated User Confirmation to ${email}`);
      return { simulated: true };
    }

    // VERY IMPORTANT: On Resend Free Tier without a custom domain, 
    // you can ONLY send emails to the verified account email.
    // If we attempt to send to the user's email, Resend will reject it.
    if (this.fromEmail === "onboarding@resend.dev" && email !== this.adminEmail) {
      console.warn(`⚠️ [EmailService] Skipping User Confirmation to ${email} because Free Tier only allows sending to the verified admin email (${this.adminEmail}).`);
      return { simulated: true, reason: "free_tier_restriction" };
    }

    try {
      const emailHtml = getUserConfirmationTemplate({ name, message, company });

      const response = await this.resend.emails.send({
        from: this.fromEmail,
        to: [email],
        subject: `¡Gracias por contactar a DevGiz, ${singleLine(name)}!`,
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
   * Adds a user to the Resend Audience for future Broadcasts
   */
  async addContactToAudience({ firstName, email }) {
    if (!this.resend) {
      console.log(`[EmailService] Simulated Adding Contact to Audience: ${email}`);
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
      
      console.log(`👥 Contact ${email} added to Resend Audience successfully.`);
      return response;
    } catch (error) {
      console.error("⚠️ Failed to add contact to Audience:", error.message);
      return { error: error.message };
    }
  }
}

// Export a singleton instance of the service
export const emailService = new EmailService();
