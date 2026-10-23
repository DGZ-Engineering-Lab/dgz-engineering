import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const MESSAGES_KEY = "devgiz_messages";
const RETENTION_DAYS = 30;

// Constant-time comparison so the secret can't be guessed byte-by-byte via timing.
function timingSafeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < y.length; i++) diff |= (x[i] ?? 0) ^ y[i];
  return diff === 0;
}

/**
 * GET /api/cron
 *
 * Cron Job de mantenimiento nocturno — DevGiz Engineering
 * Ejecutado automáticamente a las 03:00 AM COT (08:00 UTC) todos los días.
 *
 * Responsabilidades:
 *  1. Hacer ping al backend de GeoAPI (Render) para evitar que el servicio
 *     gratuito se duerma y garantizar disponibilidad diurna.
 *  2. Registrar un heartbeat en Vercel KV con la fecha/hora de la última ejecución.
 *  3. Eliminar de `devgiz_messages` los contactos con más de 30 días (retención).
 */
export async function GET(req) {
  // ─── 1. Validación de Seguridad ───────────────────────────────────────────
  const authHeader = req.headers.get("Authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || !timingSafeEqual(authHeader || "", `Bearer ${cronSecret}`)) {
    return NextResponse.json(
      { error: "Unauthorized — CRON_SECRET inválido o ausente." },
      { status: 401 }
    );
  }

  const results = {};

  // ─── 2. Ping al GeoAPI Backend (Render Warm-Up) ───────────────────────────
  try {
    const geoApiUrl = process.env.NEXT_PUBLIC_GEOAPI_URL || "https://devgiz-api.onrender.com";
    const pingRes = await fetch(`${geoApiUrl}/health`, {
      signal: AbortSignal.timeout(10000), // 10 segundo timeout
    });
    results.geoApiPing = {
      status: pingRes.status,
      ok: pingRes.ok,
      message: pingRes.ok ? "GeoAPI respondió correctamente ✓" : "GeoAPI no disponible",
    };
  } catch (err) {
    results.geoApiPing = {
      status: "ERROR",
      ok: false,
      message: `GeoAPI ping fallido: ${err.message}`,
    };
  }

  // ─── 3. Heartbeat en Vercel KV ────────────────────────────────────────────
  try {
    const now = new Date().toISOString();
    await kv.set("cron:last_run", now, { ex: 60 * 60 * 48 }); // Expira en 48h
    await kv.set("cron:geo_api_status", results.geoApiPing.ok ? "UP" : "DOWN", { ex: 60 * 60 * 48 });
    results.heartbeat = { recorded: true, timestamp: now };
  } catch (err) {
    results.heartbeat = {
      recorded: false,
      error: `KV no disponible: ${err.message}`,
    };
  }

  // ─── 4. Limpieza de Mensajes Antiguos (>30 días) ──────────────────────────
  // Los mensajes viven en la lista `devgiz_messages` (LPUSH desde /api/contact,
  // acotada a 1000 con LTRIM), así que basta un LRANGE: sin KEYS ni SCAN.
  try {
    const thirtyDaysAgo = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000;
    const stored = await kv.lrange(MESSAGES_KEY, 0, -1);
    let deleted = 0;

    for (const raw of stored) {
      let parsed;
      try {
        parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        continue; // entrada corrupta: se conserva para revisión manual
      }
      const ts = Date.parse(parsed?.timestamp ?? "");
      if (Number.isFinite(ts) && ts < thirtyDaysAgo) {
        // LREM necesita el valor exacto almacenado (cadena JSON, como en /api/admin/messages)
        const value = typeof raw === "string" ? raw : JSON.stringify(raw);
        deleted += Number(await kv.lrem(MESSAGES_KEY, 0, value)) || 0;
      }
    }
    results.cleanup = {
      messagesDeleted: deleted,
      message: `${deleted} mensajes de contacto con más de ${RETENTION_DAYS} días eliminados.`,
    };
  } catch (err) {
    results.cleanup = {
      messagesDeleted: 0,
      error: `Limpieza omitida: ${err.message}`,
    };
  }

  // ─── Respuesta Final ──────────────────────────────────────────────────────
  console.log("[CRON] DevGiz Maintenance Run Completed:", results);

  return NextResponse.json({
    ok: true,
    job: "dgz-maintenance-cron",
    executedAt: new Date().toISOString(),
    results,
  });
}
