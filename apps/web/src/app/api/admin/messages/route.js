import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { getClientIp } from "../../../../lib/security";
import { isProductionEnv } from "../../../../lib/upstash";

export const runtime = 'nodejs';

// ─── SECURITY CONSTANTS ────────────────────────────────────────────────────────
const MAX_ATTEMPTS       = 5;       // intentos de login por IP en la ventana de bloqueo
const LOCKOUT_SECONDS    = 15 * 60; // 15 minutes
const GLOBAL_MAX_ATTEMPTS = 50;     // intentos de login totales por hora (todas las IP)
const GLOBAL_WINDOW_SECONDS = 60 * 60;
const MIN_PASSCODE_LENGTH = 16;     // recomendado; 12-15 se acepta con aviso
const LEGACY_MIN_PASSCODE_LENGTH = 12;
const DELAY_ON_FAIL_MS   = 2500;    // Artificial delay on failed auth
const SESSION_TTL        = 60 * 60; // 1 hour session tokens
const AUDIT_LOG_MAX      = 200;     // Keep last 200 audit entries

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────
// Datos 100 % ficticios (placeholders evidentes): sin nombres de personas reales,
// sin dominios ni nombres de entidades reales (Ley 1581 de 2012 / uso de marcas).
const HIGH_FIDELITY_MOCKS = [
  {
    id: "contact:1716301200000",
    name: "TITULAR DE EJEMPLO 1",
    email: "contacto1@example.com",
    company: "Entidad de ejemplo 1",
    message: "[DATO FICTICIO] Requerimos cotización formal para integrar una capa parcelaria de ejemplo con el estándar LADM-COL v3.0.",
    timestamp: "2026-05-21T10:30:00.000Z"
  },
  {
    id: "contact:1716304800000",
    name: "TITULAR DE EJEMPLO 2",
    email: "contacto2@example.com",
    company: "Entidad de ejemplo 2",
    message: "[DATO FICTICIO] Estamos revisando linderos para un proyecto de ejemplo. ¿Tienen API para integración?",
    timestamp: "2026-05-21T11:45:00.000Z"
  },
  {
    id: "contact:1716308400000",
    name: "TITULAR DE EJEMPLO 3",
    email: "contacto3@example.com",
    company: "Entidad de ejemplo 3",
    message: "[DATO FICTICIO] Nos gustaría programar una reunión técnica para conocer el motor de cruce físico-jurídico.",
    timestamp: "2026-05-21T12:15:00.000Z"
  },
  {
    id: "contact:1716312000000",
    name: "TITULAR DE EJEMPLO 4",
    email: "contacto4@example.com",
    company: "Entidad de ejemplo 4",
    message: "[DATO FICTICIO] ¿Cómo manejan la reconciliación de folios de matrícula cuando hay diferencias de área?",
    timestamp: "2026-05-21T13:50:00.000Z"
  },
  {
    id: "contact:1716315600000",
    name: "TITULAR DE EJEMPLO 5",
    email: "contacto5@example.com",
    company: "Entidad de ejemplo 5",
    message: "[DATO FICTICIO] Solicitamos una demostración de la capa ambiental y de protección de rondas hídricas.",
    timestamp: "2026-05-21T14:10:00.000Z"
  }
];

// ─── GLOBAL IN-MEMORY FALLBACK (for local development when Vercel KV is not configured) ────
const globalSessions = globalThis._dgz_sessions || new Map();
if (!globalThis._dgz_sessions) globalThis._dgz_sessions = globalSessions;

const globalRateLimits = globalThis._dgz_rate_limits || new Map();
if (!globalThis._dgz_rate_limits) globalThis._dgz_rate_limits = globalRateLimits;

const globalAuditLog = globalThis._dgz_audit_log || [];
if (!globalThis._dgz_audit_log) globalThis._dgz_audit_log = globalAuditLog;

// Los datos de demostración solo se cargan fuera de producción.
const globalMessages = globalThis._dgz_messages || [];
if (!globalThis._dgz_messages) {
  globalThis._dgz_messages = globalMessages;
  if (!isProductionEnv()) globalMessages.push(...HIGH_FIDELITY_MOCKS);
}

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

// El rate limit se basa solo en la IP (el User-Agent lo controla el atacante).
const ipKey = (ip) => `rl:admin:ip:${ip}`;
const GLOBAL_KEY = "rl:admin:global";

// ─── SECURITY: AUTHENTICATION ──────────────────────────────────────────────────

// The admin passcode must come from the environment. There is deliberately no
// default: if ADMIN_PASSCODE is unset (or < 12 chars) the admin API stays locked.
// Mínimo recomendado: 16. Un passcode existente de 12-15 sigue funcionando pero
// se avisa en los logs para rotarlo (no se bloquea para no dejar fuera al admin).
let warnedShortPasscode = false;
function getAdminPasscode() {
  const passcode = process.env.ADMIN_PASSCODE;
  if (typeof passcode !== "string" || passcode.length < LEGACY_MIN_PASSCODE_LENGTH) return null;
  if (passcode.length < MIN_PASSCODE_LENGTH && !warnedShortPasscode) {
    warnedShortPasscode = true;
    console.warn(`⚠️ ADMIN_PASSCODE has ${passcode.length} chars; rotate it to at least ${MIN_PASSCODE_LENGTH}.`);
  }
  return passcode;
}

// Session-token based auth: check if Bearer token matches a valid session in KV or memory
async function authenticateSession(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return { valid: false };
  const token = authHeader.substring(7).trim();

  // First try: session token in KV
  try {
    const sessionData = await kv.get(`session:${token}`);
    if (sessionData) {
      return { valid: true, sessionToken: token, sessionData };
    }
  } catch (e) { /* KV unavailable */ }

  // Fallback: session token in memory (for offline / local dev)
  const memorySession = globalSessions.get(token);
  if (memorySession) {
    if (new Date(memorySession.expiresAt) > new Date()) {
      return { valid: true, sessionToken: token, sessionData: memorySession.data };
    } else {
      globalSessions.delete(token); // expired
    }
  }

  return { valid: false };
}

// ─── SECURITY: RATE LIMITING ───────────────────────────────────────────────────

// INCR atómico + EXPIRE en el primer incremento. Si KV no está disponible se usa
// un contador en memoria (por instancia) con la misma semántica.
async function incrementCounter(key, ttlSeconds) {
  try {
    const count = Number(await kv.incr(key));
    if (count === 1) {
      await kv.expire(key, ttlSeconds);
    }
    return count;
  } catch (e) { /* KV unavailable */ }

  const now = Date.now();
  const local = globalRateLimits.get(key);
  const active = local && local.expiresAt > now ? local : { attempts: 0, expiresAt: now + ttlSeconds * 1000 };
  active.attempts += 1;
  globalRateLimits.set(key, active);
  return active.attempts;
}

async function readCounter(key) {
  try {
    const value = await kv.get(key);
    if (value !== null && value !== undefined) return Number(value);
    return 0;
  } catch (e) { /* KV unavailable */ }

  const local = globalRateLimits.get(key);
  if (local && local.expiresAt > Date.now()) return local.attempts;
  globalRateLimits.delete(key);
  return 0;
}

// Segundos restantes de bloqueo; repara claves sin TTL (p. ej. si falló el EXPIRE).
async function getRetryAfter(key, ttlSeconds) {
  try {
    const ttl = await kv.ttl(key);
    if (ttl > 0) return ttl;
    if (ttl === -1) await kv.expire(key, ttlSeconds);
    return ttlSeconds;
  } catch (e) { /* KV unavailable */ }

  const local = globalRateLimits.get(key);
  if (local) return Math.max(1, Math.ceil((local.expiresAt - Date.now()) / 1000));
  return ttlSeconds;
}

// Comprobación de solo lectura para GET/DELETE: bloqueada si la IP agotó sus intentos.
async function checkLockout(ip) {
  const key = ipKey(ip);
  const attempts = await readCounter(key);
  if (attempts >= MAX_ATTEMPTS) {
    return { blocked: true, retryAfter: await getRetryAfter(key, LOCKOUT_SECONDS) };
  }
  return { blocked: false };
}

// Registra un intento de login ANTES de comparar el passcode (sin carreras get/set).
async function registerLoginAttempt(ip) {
  const key = ipKey(ip);
  const attempts = await incrementCounter(key, LOCKOUT_SECONDS);
  const globalAttempts = await incrementCounter(GLOBAL_KEY, GLOBAL_WINDOW_SECONDS);

  if (attempts > MAX_ATTEMPTS) {
    return { blocked: true, retryAfter: await getRetryAfter(key, LOCKOUT_SECONDS), attempts };
  }
  if (globalAttempts > GLOBAL_MAX_ATTEMPTS) {
    return { blocked: true, retryAfter: await getRetryAfter(GLOBAL_KEY, GLOBAL_WINDOW_SECONDS), attempts };
  }
  return { blocked: false, attempts };
}

async function clearIpCounter(ip) {
  const key = ipKey(ip);
  try { await kv.del(key); } catch (e) { /* noop */ }
  globalRateLimits.delete(key);
}

function lockoutResponse(retryAfter) {
  const resp = NextResponse.json(
    { error: `Security lockout. Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.`, locked: true },
    { status: 429 }
  );
  resp.headers.set("Retry-After", String(retryAfter));
  return withSecurityHeaders(resp);
}

// ─── SECURITY: AUDIT LOGGING ───────────────────────────────────────────────────

async function writeAuditLog(action, details = {}) {
  const entry = JSON.stringify({
    ts: new Date().toISOString(),
    action,
    ...details
  });

  try {
    await kv.lpush("audit:admin", entry);
    await kv.ltrim("audit:admin", 0, AUDIT_LOG_MAX - 1);
  } catch (e) { /* KV not available, skip audit */ }

  globalAuditLog.unshift(entry);
  if (globalAuditLog.length > AUDIT_LOG_MAX) {
    globalAuditLog.length = AUDIT_LOG_MAX;
  }
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
  const ip = getClientIp(req);

  // Bloqueo previo (barato) antes de leer el cuerpo
  const lock = await checkLockout(ip);
  if (lock.blocked) return lockoutResponse(lock.retryAfter);

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

  const requiredPasscode = getAdminPasscode();
  if (!requiredPasscode) {
    console.error("ADMIN_PASSCODE is not configured (min 12 chars, 16 recommended). Admin login is disabled.");
    return withSecurityHeaders(
      NextResponse.json({ error: "Admin access is not configured." }, { status: 503 })
    );
  }
  // El intento se cuenta ANTES de comparar (INCR atómico por IP + contador global)
  const attempt = await registerLoginAttempt(ip);
  if (attempt.blocked) {
    await writeAuditLog("AUTH_LOCKED", { ip });
    return lockoutResponse(attempt.retryAfter);
  }

  if (!secureCompare(passcode.trim(), requiredPasscode)) {
    await writeAuditLog("AUTH_FAIL", { ip });
    // Retardo artificial: frena herramientas automatizadas
    await new Promise(r => setTimeout(r, DELAY_ON_FAIL_MS));
    const resp = NextResponse.json(
      { error: "Access denied. Invalid passcode.", remaining: Math.max(0, MAX_ATTEMPTS - attempt.attempts) },
      { status: 401 }
    );
    return withSecurityHeaders(resp);
  }

  // ✓ Auth success — solo ahora se borra el contador de la IP (el global caduca solo)
  await clearIpCounter(ip);

  const sessionToken = generateSessionToken();
  const sessionData = {
    createdAt: new Date().toISOString(),
    ip
  };

  try {
    await kv.set(`session:${sessionToken}`, JSON.stringify(sessionData), { ex: SESSION_TTL });
  } catch (e) {
    // KV unavailable — session won't persist but login still works
  }

  // Always store in memory store as fallback
  globalSessions.set(sessionToken, {
    data: sessionData,
    expiresAt: new Date(Date.now() + SESSION_TTL * 1000).toISOString()
  });

  await writeAuditLog("LOGIN_SUCCESS", { ip });

  const resp = NextResponse.json({
    success: true,
    sessionToken,
    expiresIn: SESSION_TTL
  });
  return withSecurityHeaders(resp);
}

// ─── ROUTE: GET /api/admin/messages  (Fetch messages) ──────────────────────────

export async function GET(req) {
  const lock = await checkLockout(getClientIp(req));
  if (lock.blocked) return lockoutResponse(lock.retryAfter);

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

    // En producción KV es la fuente de verdad (también si está vacía); fuera de
    // producción se conservan los mocks cuando KV no tiene mensajes.
    if (messages.length > 0 || isProductionEnv()) {
      // Sync local memory store to match KV
      globalMessages.length = 0;
      globalMessages.push(...messages);
    }
  } catch (err) {
    console.warn("⚠️ Vercel KV unavailable. Using sovereign local buffer.");
  }

  const resp = NextResponse.json({
    success: true,
    storage: process.env.KV_REST_API_URL ? "Vercel KV Edge Serverless" : "Local Sovereign Buffer (Memory-Store)",
    messages: globalMessages
  });
  return withSecurityHeaders(resp);
}

// ─── ROUTE: DELETE /api/admin/messages  (Delete messages / logout) ─────────────
// ?id=<id> borra un mensaje, ?id=all los borra todos, ?logout=1 cierra la sesión.

export async function DELETE(req) {
  const ip = getClientIp(req);
  const { searchParams } = new URL(req.url);

  const lock = await checkLockout(ip);
  if (lock.blocked) return lockoutResponse(lock.retryAfter);

  // Logout: invalida el token en KV y en memoria (tras el control de bloqueo)
  if (searchParams.get("logout") === "1") {
    const auth = await authenticateSession(req);
    if (auth.valid) {
      try { await kv.del(`session:${auth.sessionToken}`); } catch (e) { /* KV unavailable */ }
      globalSessions.delete(auth.sessionToken);
      await writeAuditLog("LOGOUT", { ip });
    }
    // Respuesta idéntica exista o no la sesión (no revela validez del token)
    return withSecurityHeaders(NextResponse.json({ success: true, loggedOut: true }));
  }

  const auth = await authenticateSession(req);
  if (!auth.valid) {
    // Don't increment rate limiter for expired sessions — only POST login failures count
    return withSecurityHeaders(
      NextResponse.json({ error: "Unauthorized. Invalid or expired session." }, { status: 401 })
    );
  }

  try {
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
      globalMessages.length = 0;
      await writeAuditLog("WIPE_ALL", { ip });
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

    // Always delete from local memory buffer as well
    for (let i = 0; i < globalMessages.length; i++) {
      if (globalMessages[i].id === id) {
        globalMessages.splice(i, 1);
        break;
      }
    }

    await writeAuditLog("DELETE_RECORD", { ip, recordId: id });

    return withSecurityHeaders(
      NextResponse.json({ success: true, message: `Record ${id} deleted.`, deletedFromKV })
    );
  } catch (err) {
    console.error("❌ Admin delete error:", err);
    return withSecurityHeaders(
      NextResponse.json({ error: "Internal server error" }, { status: 500 })
    );
  }
}
