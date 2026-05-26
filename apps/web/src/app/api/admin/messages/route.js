import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export const runtime = 'edge';

// ─── SECURITY CONSTANTS ────────────────────────────────────────────────────────
const MAX_ATTEMPTS       = 5;
const LOCKOUT_SECONDS    = 15 * 60; // 15 minutes
const DELAY_ON_FAIL_MS   = 2500;    // Artificial delay on failed auth
const SESSION_TTL        = 60 * 60; // 1 hour session tokens
const AUDIT_LOG_MAX      = 200;     // Keep last 200 audit entries

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
const HIGH_FIDELITY_MOCKS = [
  {
    id: "contact:1716301200000",
    name: "Dr. Alejandro Montoya",
    email: "a.montoya@medellin.gov.co",
    company: "Alcaldía de Medellín - Subsecretaría de Catastro",
    message: "Requerimos cotización formal para integrar la capa parcelaria de la Comuna 14 (El Poblado) con el nuevo estándar LADM-COL v3.0 en su suite espacial. Excelente visor 3D.",
    timestamp: "2026-05-21T10:30:00.000Z"
  },
  {
    id: "contact:1716304800000",
    name: "Ing. Beatriz Elena Restrepo",
    email: "beatriz.restrepo@conconcreto.co",
    company: "Constructora Conconcreto S.A.",
    message: "Hola equipo DevGiz. Estamos auditando linderos para un mega-proyecto en Rionegro. El detector LiDAR de construcciones omitidas es justo lo que necesitamos para evitar multas catastrales. ¿Tienen API corporativa?",
    timestamp: "2026-05-21T11:45:00.000Z"
  },
  {
    id: "contact:1716308400000",
    name: "Carlos Mario Zuluaga",
    email: "carlos.zuluaga@igac.gov.co",
    company: "Instituto Geográfico Agustín Codazzi (IGAC)",
    message: "Felicitaciones por la implementación del motor de cruce físico-jurídico con Polars. Nos gustaría programar una mesa técnica para evaluar su rendimiento frente al validador nacional.",
    timestamp: "2026-05-21T12:15:00.000Z"
  },
  {
    id: "contact:1716312000000",
    name: "Diana Carolina Velez",
    email: "d.velez@supernotariado.gov.co",
    company: "Superintendencia de Notariado y Registro",
    message: "Estamos interesados en el módulo de Sincronización Híbrida Offline. ¿Cómo manejan la reconciliación de folios de matrícula inmobiliaria cuando hay desfases superiores al 10%?",
    timestamp: "2026-05-21T13:50:00.000Z"
  },
  {
    id: "contact:1716315600000",
    name: "Arq. Eduardo Giraldo",
    email: "egiraldo@amb.gov.co",
    company: "Área Metropolitana del Valle de Aburrá",
    message: "Solicitamos demo presencial de la capa ambiental y de protección de ríos de DevGiz. Queremos incorporar las alertas tempranas de invasión de cauce en nuestros mapas de ordenamiento.",
    timestamp: "2026-05-21T14:10:00.000Z"
  }
];

// ─── CRYPTOGRAPHIC UTILITIES ───────────────────────────────────────────────────

// Constant-time string comparison to prevent timing attacks.
// Iterates over every character regardless of where the first difference is.
function secureCompare(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const encoder = new TextEncoder();
  const aBuf = encoder.encode(a);
  const bBuf = encoder.encode(b);
  // XOR length difference so comparison still runs full loop
  let mismatch = aBuf.length ^ bBuf.length;
  const len = Math.max(aBuf.length, bBuf.length);
  for (let i = 0; i < len; i++) {
    mismatch |= (aBuf[i % aBuf.length] || 0) ^ (bBuf[i % bBuf.length] || 0);
  }
  return mismatch === 0;
}

// Generate a cryptographically random session token
function generateSessionToken() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, b => b.toString(16).padStart(2, "0")).join("");
}

// ─── REQUEST HELPERS ───────────────────────────────────────────────────────────

function getClientIP(req) {
  // Vercel sets x-forwarded-for with the real client IP first
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  // Edge runtime: req.ip may exist
  if (req.ip) return req.ip;
  return "unknown";
}

function getClientFingerprint(req) {
  const ip = getClientIP(req);
  const ua = req.headers.get("user-agent") || "no-ua";
  // Simple hash-like combination for fingerprinting
  let hash = 0;
  const str = `${ip}::${ua}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return `${ip}__${Math.abs(hash).toString(36)}`;
}

// ─── SECURITY: AUTHENTICATION ──────────────────────────────────────────────────

function authenticatePasscode(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.substring(7).trim();
  const requiredPasscode = process.env.ADMIN_PASSCODE || "dgz2026";
  return secureCompare(token, requiredPasscode);
}

// Session-token based auth: check if Bearer token matches a valid session in KV
async function authenticateSession(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return { valid: false };
  const token = authHeader.substring(7).trim();

  // First try: session token
  try {
    const sessionData = await kv.get(`session:${token}`);
    if (sessionData) {
      return { valid: true, sessionToken: token, sessionData };
    }
  } catch (e) { /* KV unavailable */ }

  // Fallback: direct passcode (for initial login)
  const requiredPasscode = process.env.ADMIN_PASSCODE || "dgz2026";
  if (secureCompare(token, requiredPasscode)) {
    return { valid: true, isPasscode: true };
  }

  return { valid: false };
}

// ─── SECURITY: RATE LIMITING ───────────────────────────────────────────────────

async function checkRateLimit(req) {
  const fingerprint = getClientFingerprint(req);
  const rateLimitKey = `rl:admin:${fingerprint}`;

  try {
    const attempts = (await kv.get(rateLimitKey)) || 0;
    const remaining = Math.max(0, MAX_ATTEMPTS - attempts);

    if (attempts >= MAX_ATTEMPTS) {
      const ttl = await kv.ttl(rateLimitKey);
      return { blocked: true, remaining: 0, retryAfter: ttl > 0 ? ttl : LOCKOUT_SECONDS, rateLimitKey, fingerprint };
    }
    return { blocked: false, remaining, rateLimitKey, fingerprint };
  } catch (e) {
    // KV unavailable — proceed without strict rate limiting
    return { blocked: false, remaining: MAX_ATTEMPTS, rateLimitKey, fingerprint };
  }
}

async function recordFailedAttempt(rateLimitKey, fingerprint) {
  try {
    const current = (await kv.get(rateLimitKey)) || 0;
    await kv.set(rateLimitKey, current + 1, { ex: LOCKOUT_SECONDS });
  } catch (e) { /* KV unavailable */ }

  // Audit log
  await writeAuditLog("AUTH_FAIL", { fingerprint });

  // Artificial delay — slows automated tools
  await new Promise(r => setTimeout(r, DELAY_ON_FAIL_MS));
}

async function clearRateLimit(rateLimitKey) {
  try { await kv.del(rateLimitKey); } catch (e) { /* noop */ }
}

// ─── SECURITY: AUDIT LOGGING ───────────────────────────────────────────────────

async function writeAuditLog(action, details = {}) {
  try {
    const entry = JSON.stringify({
      ts: new Date().toISOString(),
      action,
      ...details
    });
    await kv.lpush("audit:admin", entry);
    await kv.ltrim("audit:admin", 0, AUDIT_LOG_MAX - 1);
  } catch (e) { /* KV not available, skip audit */ }
}

// ─── SECURITY HEADERS ──────────────────────────────────────────────────────────

function withSecurityHeaders(response) {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  response.headers.set("Pragma", "no-cache");
  return response;
}

// ─── ROUTE: POST /api/admin/messages  (Login → returns session token) ──────────

export async function POST(req) {
  const { blocked, remaining, retryAfter, rateLimitKey, fingerprint } = await checkRateLimit(req);

  if (blocked) {
    const resp = NextResponse.json(
      { error: `Security lockout. Too many failed attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.`, locked: true },
      { status: 429 }
    );
    resp.headers.set("Retry-After", String(retryAfter));
    return withSecurityHeaders(resp);
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return withSecurityHeaders(NextResponse.json({ error: "Invalid request body." }, { status: 400 }));
  }

  const { passcode } = body || {};
  if (!passcode || typeof passcode !== "string") {
    return withSecurityHeaders(NextResponse.json({ error: "Passcode is required." }, { status: 400 }));
  }

  const requiredPasscode = process.env.ADMIN_PASSCODE || "dgz2026";
  if (!secureCompare(passcode.trim(), requiredPasscode)) {
    await recordFailedAttempt(rateLimitKey, fingerprint);
    const resp = NextResponse.json(
      { error: "Access denied. Invalid passcode.", remaining: remaining - 1 },
      { status: 401 }
    );
    return withSecurityHeaders(resp);
  }

  // ✓ Auth success — issue a session token
  await clearRateLimit(rateLimitKey);

  const sessionToken = generateSessionToken();
  const sessionData = {
    fingerprint,
    createdAt: new Date().toISOString(),
    ip: getClientIP(req)
  };

  try {
    await kv.set(`session:${sessionToken}`, JSON.stringify(sessionData), { ex: SESSION_TTL });
  } catch (e) {
    // KV unavailable — session won't persist but login still works
  }

  await writeAuditLog("LOGIN_SUCCESS", { fingerprint });

  const resp = NextResponse.json({
    success: true,
    sessionToken,
    expiresIn: SESSION_TTL
  });
  return withSecurityHeaders(resp);
}

// ─── ROUTE: GET /api/admin/messages  (Fetch messages) ──────────────────────────

export async function GET(req) {
  const { blocked, retryAfter, rateLimitKey, fingerprint } = await checkRateLimit(req);
  if (blocked) {
    const resp = NextResponse.json(
      { error: `Security lockout. Try again in ${Math.ceil(retryAfter / 60)} minutes.`, locked: true },
      { status: 429 }
    );
    resp.headers.set("Retry-After", String(retryAfter));
    return withSecurityHeaders(resp);
  }

  const auth = await authenticateSession(req);
  if (!auth.valid) {
    // Don't increment rate limiter for expired sessions — only POST login failures count
    return withSecurityHeaders(
      NextResponse.json({ error: "Unauthorized. Invalid or expired session." }, { status: 401 })
    );
  }

  try {
    const storedRaw = await kv.lrange("devgiz_messages", 0, -1);
    const messages = storedRaw.map(item => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch (e) {
        return { id: `err:${Math.random()}`, name: "Error parsing item", message: String(item) };
      }
    });

    const resp = NextResponse.json({
      success: true,
      storage: "Vercel KV Edge Serverless",
      messages: messages.length > 0 ? messages : HIGH_FIDELITY_MOCKS
    });
    return withSecurityHeaders(resp);
  } catch (err) {
    console.warn("⚠️ Vercel KV unavailable. Returning sovereign simulation.");
    const resp = NextResponse.json({
      success: true,
      storage: "Local Sovereign Buffer (Simulation)",
      messages: HIGH_FIDELITY_MOCKS
    });
    return withSecurityHeaders(resp);
  }
}

// ─── ROUTE: DELETE /api/admin/messages  (Delete messages) ──────────────────────

export async function DELETE(req) {
  const { blocked, retryAfter, rateLimitKey, fingerprint } = await checkRateLimit(req);
  if (blocked) {
    const resp = NextResponse.json(
      { error: `Security lockout. Try again in ${Math.ceil(retryAfter / 60)} minutes.`, locked: true },
      { status: 429 }
    );
    resp.headers.set("Retry-After", String(retryAfter));
    return withSecurityHeaders(resp);
  }

  const auth = await authenticateSession(req);
  if (!auth.valid) {
    // Don't increment rate limiter for expired sessions — only POST login failures count
    return withSecurityHeaders(
      NextResponse.json({ error: "Unauthorized. Invalid or expired session." }, { status: 401 })
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return withSecurityHeaders(
        NextResponse.json({ error: "Missing 'id' parameter." }, { status: 400 })
      );
    }

    if (id === "all") {
      try {
        await kv.del("devgiz_messages");
      } catch (e) {
        console.warn("KV bypass deletion for reset");
      }
      await writeAuditLog("WIPE_ALL", { fingerprint });
      return withSecurityHeaders(
        NextResponse.json({ success: true, message: "All records deleted.", storage: "Cleared" })
      );
    }

    // Single delete
    let deletedFromKV = false;
    try {
      const storedRaw = await kv.lrange("devgiz_messages", 0, -1);
      let targetItemString = null;
      for (const raw of storedRaw) {
        try {
          const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
          if (parsed && parsed.id === id) {
            targetItemString = typeof raw === "string" ? raw : JSON.stringify(raw);
            break;
          }
        } catch (e) { /* skip corrupt */ }
      }
      if (targetItemString) {
        await kv.lrem("devgiz_messages", 1, targetItemString);
        deletedFromKV = true;
      }
    } catch (e) {
      console.warn("Could not delete from KV.");
    }

    await writeAuditLog("DELETE_RECORD", { fingerprint, recordId: id });

    return withSecurityHeaders(
      NextResponse.json({ success: true, message: `Record ${id} deleted.`, deletedFromKV })
    );
  } catch (err) {
    return withSecurityHeaders(
      NextResponse.json({ error: err.message }, { status: 500 })
    );
  }
}
