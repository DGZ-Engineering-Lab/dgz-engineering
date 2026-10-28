import { NextResponse } from "next/server";
import { checkRateLimit } from "../../../../lib/upstash";
import { assertSameOrigin, getClientIp, matchesFileSignature } from "../../../../lib/security";

export const runtime = "nodejs";

// Minimización de datos (Ley 1581): el archivo se analiza en memoria y se descarta al
// responder. No se persiste en Vercel Blob ni en ningún otro almacenamiento, porque puede
// contener datos personales de terceros y el panel solo usa el GeoJSON parseado
// (SpatialIntelligenceDashboard no usa `url`). Si en el futuro se necesita una URL, usar
// put(..., { access: "private" o "public", addRandomSuffix: true }) y borrar los archivos
// desde /api/cron con una retención corta.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB body limit
// Solo los formatos que el panel procesa; el resto se rechaza en lugar de recibirse sin uso.
const ALLOWED_TYPES = {
  geojson: "application/geo+json",
  json: "application/json",
};

function sanitizeFilename(name) {
  const base = String(name || "upload").split(/[\\/]/).pop();
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "");
  return (cleaned || "upload").slice(0, 100);
}

export async function POST(req) {
  try {
    // CSRF: solo el propio sitio (multipart, así que no se exige JSON)
    if (!assertSameOrigin(req)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    // 5 subidas por IP y día; fail-closed para limitar abuso del endpoint sin autenticación
    const { success, reason } = await checkRateLimit(getClientIp(req), {
      name: "upload",
      tokens: 5,
      window: "1 d",
      failClosed: true,
    });
    if (!success) {
      return reason === "unavailable"
        ? NextResponse.json({ error: "Upload service temporarily unavailable." }, { status: 503 })
        : NextResponse.json({ error: "Too many uploads. Please wait before retrying." }, { status: 429 });
    }

    const declaredLength = Number(req.headers.get("content-length") || 0);
    if (declaredLength > MAX_UPLOAD_BYTES + 64 * 1024) {
      return NextResponse.json({ error: "File too large (max 4 MB)" }, { status: 413 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided in form payload" }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: "Empty file" }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File too large (max 4 MB)" }, { status: 413 });
    }

    const filename = sanitizeFilename(file.name);
    const extension = filename.includes(".") ? filename.split(".").pop().toLowerCase() : "";
    if (!ALLOWED_TYPES[extension]) {
      return NextResponse.json(
        { error: `Unsupported file type. Allowed: ${Object.keys(ALLOWED_TYPES).join(", ")}` },
        { status: 415 }
      );
    }

    // El contenido real debe coincidir con la extensión declarada (magic bytes)
    const head = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
    if (!matchesFileSignature(extension, head)) {
      return NextResponse.json(
        { error: "File content does not match its extension" },
        { status: 415 }
      );
    }

    // Se parsea en memoria; el contenido no se registra en logs ni se almacena
    let geojson = null;
    try {
      geojson = JSON.parse(await file.text());
    } catch {
      return NextResponse.json({ error: "Invalid JSON/GeoJSON file" }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      url: null,
      filename,
      size: file.size,
      geojson,
      storage: "memoria temporal (no se almacena)",
    });

  } catch (error) {
    console.error("❌ Upload endpoint error:", error?.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
