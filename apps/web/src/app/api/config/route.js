import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const runtime = 'edge'; // Force Edge Runtime for maximum performance

export async function GET() {
  try {
    // Attempt to read from Edge Config (Zero-latency read)
    let systemStatus = {
      message: "SYSTEMS_OPERATIONAL",
      color: "emerald",
      maintenance: false
    };

    try {
      const config = await get("devgiz_config");
      if (config && config.systemStatus) {
        systemStatus = config.systemStatus;
      }
    } catch (e) {
      // Edge Config not connected yet
    }

    return NextResponse.json({ systemStatus });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
