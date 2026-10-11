import { NextResponse } from "next/server";
import { internalError } from "../../../lib/http";
import { get } from "@vercel/edge-config";

export const runtime = 'nodejs';

export async function GET() {
  try {
    let flags = {
      premium_viewer: false,
      experimental_gestures: true,
      ai_audit_mode: false
    };

    try {
      // Support both the user's existing Vercel Edge Config 'features' field and the template fields
      const features = /** @type {Record<string, unknown> | undefined} */ (await get("features"));
      if (features) {
        flags = {
          premium_viewer: !!features.gis_viewer_premium,
          experimental_gestures: true,
          ai_audit_mode: !!features.ai_analysis_node
        };
      } else {
        const edgeFlags = /** @type {Record<string, boolean> | undefined} */ (await get("devgiz_flags"));
        if (edgeFlags) flags = { ...flags, ...edgeFlags };
      }
    } catch (e) {
      // Fallback
    }

    return NextResponse.json(flags);
  } catch (error) {
    return internalError(error, "flags");
  }
}
