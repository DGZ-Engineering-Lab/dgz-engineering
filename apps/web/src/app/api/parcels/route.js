import { NextResponse } from "next/server";
import { cacheWrap } from "../../../lib/upstash";

const GEOAPI_URL = process.env.NEXT_PUBLIC_GEOAPI_URL || "https://devgiz-api.onrender.com";

export async function GET() {
  try {
    const data = await cacheWrap("cache:geojson_parcels", 3600, async () => {
      console.log(`🌐 Fetching parcels GeoJSON from Render backend: ${GEOAPI_URL}/parcels`);
      const res = await fetch(`${GEOAPI_URL}/parcels`, {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 3600 } // ISR for Next.js fetch cache as a second layer!
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch parcels: ${res.statusText}`);
      }
      
      return await res.json();
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Error fetching parcels:", error);
    return NextResponse.json(
      { error: "Failed to load parcel data", message: error.message },
      { status: 500 }
    );
  }
}
