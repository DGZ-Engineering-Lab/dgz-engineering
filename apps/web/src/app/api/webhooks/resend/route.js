import { NextResponse } from 'next/server';
import { Webhook } from 'svix';

const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

export async function POST(req) {
  try {
    const payload = await req.text();
    const headers = {
      'svix-id': req.headers.get('svix-id'),
      'svix-timestamp': req.headers.get('svix-timestamp'),
      'svix-signature': req.headers.get('svix-signature'),
    };

    // Never accept unsigned events: without a secret we cannot tell Resend from anyone else.
    if (!webhookSecret) {
      console.error("⚠️ RESEND_WEBHOOK_SECRET is not configured. Rejecting unverified webhook.");
      return NextResponse.json({ error: "Webhook verification not configured" }, { status: 503 });
    }

    const wh = new Webhook(webhookSecret);
    /** @type {{ type: string, data: Record<string, any> }} */
    let event;

    try {
      event = /** @type {{ type: string, data: Record<string, any> }} */ (wh.verify(payload, headers));
    } catch (err) {
      console.error("⚠️ Webhook verification failed:", err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Process the verified event
    const { type, data } = event;
    console.log(`[Resend Webhook] Received Event: ${type}`, data?.email_id || "");

    switch (type) {
      case 'email.sent':
        // Update your database to mark email as sent
        break;
      case 'email.delivered':
        // Update your database to mark email as delivered
        break;
      case 'email.bounced':
        console.warn(`[Resend Webhook] Email to ${data.to[0]} bounced!`);
        break;
      case 'email.complained':
        console.warn(`[Resend Webhook] User ${data.to[0]} marked email as SPAM!`);
        // Good practice: remove from Audience or mark as unsubscribed
        break;
      default:
        console.log(`[Resend Webhook] Unhandled event type: ${type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("⚠️ Resend Webhook Error:", error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
