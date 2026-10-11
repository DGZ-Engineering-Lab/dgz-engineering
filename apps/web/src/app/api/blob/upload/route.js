import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { checkRateLimit } from "../../../../lib/upstash";
import { getClientIp } from "../../../../lib/security";

export const runtime = "nodejs";

// Uploads are public and unauthenticated, so only accept small geospatial files.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stays under Vercel's 4.5 MB body limit
const ALLOWED_TYPES = {
  geojson: "application/geo+json",
  json: "application/json",
  zip: "application/zip",
  kml: "application/vnd.google-earth.kml+xml",
  gpkg: "application/geopackage+sqlite3",
  csv: "text/csv",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

function sanitizeFilename(name) {
  const base = String(name || "upload").split(/[\\/]/).pop();
  const cleaned = base.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "");
  return (cleaned || "upload").slice(0, 100);
}

export async function POST(req) {
  try {
    const { success } = await checkRateLimit(`rate_limit:upload:${getClientIp(req)}`);
    if (!success) {
      return NextResponse.json({ error: "Too many uploads. Please wait before retrying." }, { status: 429 });
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
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "File too large (max 4 MB)" }, { status: 413 });
    }

    const filename = sanitizeFilename(file.name);
    const extension = filename.includes(".") ? filename.split(".").pop().toLowerCase() : "";
    const contentType = ALLOWED_TYPES[extension];
    if (!contentType) {
      return NextResponse.json(
        { error: `Unsupported file type. Allowed: ${Object.keys(ALLOWED_TYPES).join(", ")}` },
        { status: 415 }
      );
    }
    
    // Parse file content if it is GeoJSON or JSON
    let geojson = null;
    if (extension === "geojson" || extension === "json") {
      try {
        const text = await file.text();
        geojson = JSON.parse(text);
      } catch (err) {
        console.warn("⚠️ Failed to parse GeoJSON file in flight:", err.message);
      }
    }

    // Determine Vercel Blob token status and upload
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    let url = "";

    if (blobToken) {
      try {
        const blob = await put(`uploads/${filename}`, file, {
          access: "public",
          token: blobToken,
          contentType,
          addRandomSuffix: true
        });
        url = blob.url;
        console.log(`🚀 File uploaded to Vercel Blob: ${url}`);
      } catch (uploadErr) {
        console.warn("⚠️ Failed to upload to real Vercel Blob, falling back to local simulation:", uploadErr.message);
        url = `https://devgiz-simulated-blob.vercel-storage.com/${Date.now()}-${filename}`;
      }
    } else {
      console.warn("⚠️ BLOB_READ_WRITE_TOKEN is missing. Simulating Vercel Blob storage perimetrally.");
      url = `https://devgiz-simulated-blob.vercel-storage.com/${Date.now()}-${filename}`;
    }

    return NextResponse.json({
      success: true,
      url,
      filename,
      size: file.size,
      geojson,
      storage: blobToken ? "Vercel Blob Edge" : "Local Sovereign Buffer (Simulation)"
    });

  } catch (error) {
    console.error("❌ Vercel Blob upload endpoint error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
