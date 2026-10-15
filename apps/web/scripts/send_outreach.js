/**
 * DEVGIZ COLOMBIA - B2B COLD OUTREACH UTILITY (ES MODULES)
 * Uses Resend API to send highly personalized, humanized email proposals
 * with interactive brochure links and calculator CTAs to Colombian prospects.
 * Promotes the full suite of services: Automation, Big Data Crossings, Databases, and GeoAI.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

// The Resend key must come from the environment (apps/web/.env.local); never hardcode it.
const RESEND_API_KEY = process.env.RESEND_API_KEY;

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
  let tierPainPoint = "reprocesos manuales de planos y desorden en sus archivos de datos territoriales";
  if (tier === "Mega") {
    tierPainPoint = "pérdidas millonarias por retrasos en licencias, cruces fallidos de linderos prediales e ineficiencias en el procesamiento manual de grandes volúmenes de datos catastrales";
  } else if (tier === "Pyme") {
    tierPainPoint = "tiempo valioso perdido en digitar planos a mano, verificar restricciones del POT o estructurar archivos geográficos dispersos";
  } else if (tier === "Gobierno") {
    tierPainPoint = "fuga de recaudo del impuesto predial por falta de cruces de datos entre catastro, hacienda y registros de escrituras actualizados";
  }

  const subject = `¿Pérdidas de tiempo y recursos en sus datos territoriales? Automatice con DevGiz Colombia`;
  
  const emailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6; font-size: 15px;">
      <h2 style="color: #0891b2; font-weight: 800; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
        DEVGIZ // INGENIERÍA DE DATOS & INTELIGENCIA ESPACIAL
      </h2>
      <p>Hola <strong>${contact_name}</strong>,</p>
      <p>Espero que estés teniendo un excelente día en tu rol como <strong>${position}</strong> en <strong>${company}</strong>.</p>
      
      <p>Te escribo porque sabemos de primera mano que muchas empresas y entidades públicas en Colombia pierden cientos de horas y millones de pesos mensuales en <strong>tareas repetitivas y desorganizadas con datos de tierras</strong>. Procesar planos CAD de forma manual, lidiar con archivos Excel duplicados, buscar afectaciones ambientales del POT en PDFs escaneados y cruzar bases de datos dispersas ralentiza la operación y drena tus recursos fijos.</p>
      
      <p>En DevGiz transformamos esta ineficiencia operativa en <strong>procesos automáticos, veloces y 100% confiables</strong>. Desarrollamos soluciones avanzadas de ingeniería espacial y arquitectura de datos que resuelven tus dolores del día a día:</p>
      <ul>
        <li style="margin-bottom: 10px;"><strong>1. Automatización de Procesos:</strong> Convertimos planos AutoCAD (.dwg) a bases de datos geográficas de forma 100% desatendida y generamos expedientes catastrales listos para notaría en segundos.</li>
        <li style="margin-bottom: 10px;"><strong>2. Cruce Masivo de Datos (DuckDB + Polars):</strong> Cruzamos bases de datos prediales, notariales y fiscales con millones de registros en milisegundos para detectar inconsistencias de límites, traslapes de linderos u oportunidades de recaudo fiscal omitidas.</li>
        <li style="margin-bottom: 10px;"><strong>3. Arquitectura de Bases de Datos (PostGIS + Cloud):</strong> Unificamos y migramos archivos CAD sueltos, Excel dispersos e información obsoleta a un repositorio centralizado seguro y veloz en la nube, disponible desde cualquier pantalla móvil.</li>
        <li style="margin-bottom: 10px;"><strong>4. GeoAI & Agentes Inteligentes:</strong> Implementamos agentes de IA que leen escrituras y folios de matrícula en formato imagen/PDF, extraen anotaciones legales complejas y validan la cadena de tradición predial automáticamente.</li>
      </ul>

      <p>Hemos habilitado una herramienta digital interactiva para que estimes tu ahorro neto en segundos. Puedes simular tu caso y ver cómo eliminamos estas pérdidas operativas aquí:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://devgiz.vercel.app/brochure" style="background-color: #0f172a; color: #ffffff; padding: 15px 30px; font-weight: bold; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
          Calcular Mi Ahorro Ahora
        </a>
      </div>

      <p>¿Tendrías disponibilidad para una llamada corta de 10 minutos esta semana o agendar un demo rápido por Meet para mostrarte cómo podemos optimizar el rendimiento de tu infraestructura de datos territoriales?</p>
      
      <p style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 13px; color: #64748b;">
        Atentamente,<br>
        <strong>El Equipo de Soluciones de Datos Territoriales DevGiz</strong><br>
        WhatsApp de Enlace Directo: +57 300 123 4567<br>
        <a href="https://devgiz.vercel.app" style="color: #0891b2; text-decoration: none;">devgiz.vercel.app</a>
      </p>
    </div>
  `;

  if (dryRun) {
    console.log(`[DRY-RUN] Would send email to: ${contact_name} <${email}> from ${company}`);
    console.log(`[DRY-RUN] Subject: ${subject}`);
    console.log(`[DRY-RUN] Body excerpt: "...tareas repetitivas y desorganizadas con datos de tierras..."`);
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
    if (!RESEND_API_KEY) {
      console.error(`[-] RESEND_API_KEY is not set. Add it to apps/web/.env.local or export it before using --live.`);
      process.exit(1);
    }
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
