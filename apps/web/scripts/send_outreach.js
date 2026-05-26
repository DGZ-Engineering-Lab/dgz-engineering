/**
 * DEVGIZ COLOMBIA - B2B COLD OUTREACH UTILITY
 * Uses Resend API to send highly personalized, humanized email proposals
 * with interactive brochure links and calculator CTAs to Colombian prospects.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Import Resend SDK or fallback to native fetch API for zero external dependency errors!
const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_eMebpExi_AoRa5VtvgegXuVmKPWcMTKBR";

// Read compiled leads from scratch directory
const LEADS_FILE_PATH = path.join(__dirname, "../../../scratch/colombian_leads.json");

function readLeads() {
  try {
    if (!fs.existsSync(LEADS_FILE_PATH)) {
      console.error(`[-] Leads file not found at: ${LEADS_FILE_PATH}. Run lead_prospector.py first!`);
      process.exit(1);
    }
    const data = fs.readFileSync(LEADS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`[-] Error reading leads: ${err.message}`);
    process.exit(1);
  }
}

async function sendOutreachEmail(lead, dryRun = true) {
  const { company, contact_name, position, email, tier } = lead;
  
  // Custom message elements based on the business tier to make it extremely human
  let tierPainPoint = "retener licencias catastrales y linderos confusos";
  if (tier === "Mega") {
    tierPainPoint = "retrasos críticos en licencias ambientales, POT municipal o linderos superpuestos que congelan capital";
  } else if (tier === "Pyme") {
    tierPainPoint = "demoras interminables verificando afectaciones de ley o linderos que ahuyentan a tus compradores de lotes campestres";
  } else if (tier === "Gobierno") {
    tierPainPoint = "recaudo ineficiente del impuesto predial y falta de una base catastral actualizada bajo LADM-COL";
  }

  const subject = `¿Retrasos en sus planos de obras? Ahorre hasta un 40% en tiempos de predios - DevGiz Colombia`;
  
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6; font-size: 15px;">
      <h2 style="color: #0891b2; font-weight: 800; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
        DEVGIZ // INTELIGENCIA TERRITORIAL
      </h2>
      <p>Hola <strong>${contact_name}</strong>,</p>
      <p>Espero que estés teniendo un excelente día en tu rol como <strong>${position}</strong> en <strong>${company}</strong>.</p>
      
      <p>Te escribo porque en el sector inmobiliario y de construcción en Colombia conocemos de primera mano el dolor de cabeza y la fuga de capital que representa esperar semanas para verificar linderos, cruzar planos con el POT o descartar restricciones ambientales antes de adquirir tierras o iniciar una obra. Un solo retraso en licencias puede costarle a una constructora hasta <strong>$15,000,000 COP semanales</strong> en cuadrillas quietas e intereses.</p>
      
      <p>En DevGiz hacemos simple lo complejo. Hemos diseñado una plataforma de Inteligencia Territorial que reduce estos tiempos a minutos. Ayudamos a empresas de alto impacto en Colombia a:</p>
      <ul>
        <li style="margin-bottom: 8px;"><strong>Validar linderos reales y afectaciones ambientales</strong> en 5 minutos en lugar de semanas, reduciendo visitas de campo innecesarias.</li>
        <li style="margin-bottom: 8px;"><strong>Detectar riesgos en tiempo real:</strong> Cruce automático con POT local, Pomcas, reservas forestales nacionales (Ley 2da de 1959) y zonas de riesgo.</li>
        <li style="margin-bottom: 8px;"><strong>Control total desde tu móvil:</strong> Toda la información catastral de tus lotes unificada en un visor 3D intuitivo y de alto rendimiento.</li>
      </ul>

      <p>Hemos habilitado una herramienta digital interactiva para que estimes tu ahorro neto en segundos. Puedes simular tu caso aquí:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://devgiz.vercel.app/brochure" style="background-color: #0f172a; color: #ffffff; padding: 15px 30px; font-weight: bold; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
          Calcular Mi Ahorro Ahora
        </a>
      </div>

      <p>¿Tendrías disponibilidad para una llamada corta de 10 minutos esta semana o agendar un demo rápido por Meet y mostrarte cómo agilizamos el desarrollo de proyectos en ${lead.city}?</p>
      
      <p style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 13px; color: #64748b;">
        Atentamente,<br>
        <strong>El Equipo de Soluciones Territoriales DevGiz</strong><br>
        WhatsApp de Enlace Directo: +57 300 123 4567<br>
        <a href="https://devgiz.vercel.app" style="color: #0891b2; text-decoration: none;">devgiz.vercel.app</a>
      </p>
    </div>
  `;

  if (dryRun) {
    console.log(`[DRY-RUN] Would send email to: ${contact_name} <${email}> from ${company}`);
    console.log(`[DRY-RUN] Subject: ${subject}`);
    console.log(`[DRY-RUN] Body excerpt: "...${company} conocemos de primera mano el dolor de cabeza..."`);
    console.log(`--------------------------------------------------------------------------------`);
    return { success: true, dryRun: true };
  }

  // Send request using native fetch API to avoid dependency locks
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: "DevGiz Territorial <outreach@resend.dev>", // Or verified domain
        to: [email],
        subject: subject,
        html: emailHtml
      })
    });

    const data = await res.json();
    if (res.ok) {
      console.log(`[✓] Outreach email successfully sent to: ${contact_name} (${email}) at ${company}`);
      return { success: true, emailId: data.id };
    } else {
      console.warn(`[!] Resend API error: ${data.message || JSON.stringify(data)}`);
      return { success: false, error: data };
    }
  } catch (err) {
    console.error(`[-] Outreach dispatch connection failed to ${email}: ${err.message}`);
    return { success: false, error: err.message };
  }
}

async function runOutreachCampaign() {
  const leads = readLeads();
  console.log(`[*] Starting cold outreach email campaign dispatch for ${leads.length} hydrated leads...`);
  
  // Dry run check
  const args = process.argv.slice(2);
  const dryRun = !args.includes("--live");
  
  if (dryRun) {
    console.log(`[i] RUNNING IN DRY-RUN MODE. No real emails will be dispatched. To send live, run: node apps/web/scripts/send_outreach.js --live`);
    console.log(`================================================================================`);
  } else {
    console.log(`[⚠️] LIVE MODE ENABLED! SENDING REAL EMAILS TO THE OUTBOX...`);
    console.log(`================================================================================`);
  }

  let successCount = 0;
  for (const lead of leads) {
    // Artificial spacing delay to avoid rate-limiting limits of outreach mailers
    await new Promise(r => setTimeout(r, 800));
    
    // Simulate/send
    const result = await sendOutreachEmail(lead, dryRun);
    if (result.success) successCount++;
  }

  console.log(`\n[★] Campaign execution complete. Spaced logs: ${successCount}/${leads.length} processed successfully.`);
}

runOutreachCampaign();
