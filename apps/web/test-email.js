import { config } from 'dotenv';
config({ path: '.env.local' });

// Script manual de prueba del EmailService. Nunca se ejecuta en producción.
// Uso: TEST_EMAIL_TO=tu_correo@ejemplo.com node test-email.js
// (por defecto usa RESEND_ADMIN_EMAIL, el único destino permitido en Resend Free Tier)

if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
  console.error("test-email.js is a local-only script. Refusing to run in production.");
  process.exit(1);
}

async function test() {
  const recipient = process.env.TEST_EMAIL_TO || process.env.RESEND_ADMIN_EMAIL;
  if (!recipient) {
    console.error("Set TEST_EMAIL_TO (or RESEND_ADMIN_EMAIL) in .env.local before running this script.");
    process.exit(1);
  }

  console.log("Testing Email Service...");
  console.log("API Key:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");

  // Import dinámico: las variables de entorno deben estar cargadas antes del servicio
  const { emailService } = await import('./src/lib/email-service.js');

  const payload = {
    name: "Test User",
    email: recipient,
    company: "Test Company",
    message: "This is a test message from local script."
  };

  try {
    console.log("1. Testing Audience Addition (explicit consent)...");
    const audRes = await emailService.addContactToAudience({ firstName: payload.name, email: payload.email, consent: true });
    console.log("Audience Response:", audRes);

    console.log("\n2. Testing Admin Notification...");
    const adminRes = await emailService.sendAdminNotification(payload);
    console.log("Admin Response:", adminRes);

    console.log("\n3. Testing User Confirmation...");
    const userRes = await emailService.sendUserConfirmation(payload);
    console.log("User Response:", userRes);

  } catch (error) {
    console.error("Caught error:", error);
  }
}

test();
