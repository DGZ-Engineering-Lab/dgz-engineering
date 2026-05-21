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
      // Support both the user's existing Vercel Edge Config fields and the template fields
      const systemStatusKey = await get("system_status");
      const maintenanceModeKey = await get("maintenance_mode");

      if (systemStatusKey !== undefined || maintenanceModeKey !== undefined) {
        systemStatus = {
          message: systemStatusKey === "operational" ? "SYSTEMS_OPERATIONAL" : String(systemStatusKey).toUpperCase(),
          color: systemStatusKey === "operational" ? "emerald" : "amber",
          maintenance: !!maintenanceModeKey
        };
      } else {
        const config = await get("devgiz_config");
        if (config && config.systemStatus) {
          systemStatus = config.systemStatus;
        }
      }
    } catch (e) {
      // Edge Config not connected yet
    }

    return NextResponse.json({ systemStatus });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
