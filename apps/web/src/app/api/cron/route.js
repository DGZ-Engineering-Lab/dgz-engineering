import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

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
 *  3. Limpiar mensajes de contacto procesados con más de 30 días de antigüedad.
 */
export async function GET(req) {
  // ─── 1. Validación de Seguridad ───────────────────────────────────────────
  const authHeader = req.headers.get("Authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
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
  try {
    const allKeys = await kv.keys("contact:*");
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    let deleted = 0;

    for (const key of allKeys) {
      const msg = /** @type {{ createdAt?: string } | null} */ (await kv.hgetall(key));
      if (msg?.createdAt && new Date(msg.createdAt).getTime() < thirtyDaysAgo) {
        await kv.del(key);
        deleted++;
      }
    }
    results.cleanup = {
      messagesDeleted: deleted,
      message: `${deleted} mensajes de contacto archivados.`,
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
