import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const runtime = 'edge';

export async function GET() {
  try {
    let flags = {
      premium_viewer: false,
      experimental_gestures: true,
      ai_audit_mode: false
    };

    try {
      const edgeFlags = await get("devgiz_flags");
      if (edgeFlags) flags = { ...flags, ...edgeFlags };
    } catch (e) {
      // Fallback
    }

    return NextResponse.json(flags);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
