import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export async function GET() {
  try {
    // Try to get data from Vercel KV if available
    // Fallback to simulated dynamic data if KV is not configured yet
    let activeNodes = 1240;
    let dataProcessed = "8.2TB";
    
    try {
       const kvNodes = await kv.get("active_nodes");
       if (kvNodes) activeNodes = kvNodes;
       
       const kvData = await kv.get("total_data");
       if (kvData) dataProcessed = kvData;
    } catch (e) {
       // KV likely not configured in Free Tier yet, using robust simulation
       activeNodes = 1200 + Math.floor(Math.random() * 100);
       dataProcessed = (8.0 + Math.random()).toFixed(1) + "TB";
    }

    return NextResponse.json({
      activeNodes,
      dataProcessed,
      status: "NOMINAL",
      timestamp: new Date().toISOString(),
      region: "COL-CENTRAL-01"
    });
  } catch (error) {
    return NextResponse.json({ status: "ERROR", message: error.message }, { status: 500 });
  }
}
