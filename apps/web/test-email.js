import { config } from 'dotenv';
config({ path: '.env.local' });

// We need to import dynamically or set env vars before importing the service
// Removed static import

async function test() {
  console.log("Testing Email Service...");
  console.log("API Key:", process.env.RESEND_API_KEY ? "Loaded" : "Missing");
  
  const { emailService } = await import('./src/lib/email-service.js');
  
  const payload = {
    name: "Test User",
    email: "Albertg2109@gmail.com", // Send to admin to ensure it passes Free Tier checks
    company: "Test Company",
    message: "This is a test message from local script."
  };

  try {
    console.log("1. Testing Audience Addition...");
    const audRes = await emailService.addContactToAudience({ firstName: payload.name, email: payload.email });
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
