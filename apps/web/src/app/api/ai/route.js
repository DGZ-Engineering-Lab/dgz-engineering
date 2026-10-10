import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '../../../lib/upstash';
import { getClientIp } from '../../../lib/security';

const MAX_PROMPT_CHARS = 6000;
const MAX_CONTEXT_CHARS = 12000;

export const runtime = 'edge';

// Initialize Groq SDK if key is configured
let groq = null;
const apiKey = process.env.GROQ_API_KEY;
if (apiKey) {
  groq = new Groq({ apiKey });
}

export async function POST(req) {
  try {
    // 1. IP Rate Limiting (Using Upstash)
    const ip = getClientIp(req);
    const { success, limit, remaining, reset } = await checkRateLimit(`rate_limit:ai:${ip}`);

    if (!success) {
      return NextResponse.json(
        { error: "Too many AI analysis requests. Please wait before retrying." },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString()
          }
        }
      );
    }

    // 2. Validate incoming request
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt query" }, { status: 400 });
    }
    if (prompt.length > MAX_PROMPT_CHARS) {
      return NextResponse.json({ error: `Prompt exceeds ${MAX_PROMPT_CHARS} characters` }, { status: 413 });
    }
    const contextJson = JSON.stringify(body?.context || {});
    if (contextJson.length > MAX_CONTEXT_CHARS) {
      return NextResponse.json({ error: `Context exceeds ${MAX_CONTEXT_CHARS} characters` }, { status: 413 });
    }

    // 3. Fallback simulation if GROQ is not configured yet (marketing demo friendly)
    if (!groq) {
      console.warn("⚠️ GROQ_API_KEY is not configured. Running simulation mode.");
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate AI latency
      return NextResponse.json({
        success: true,
        text: `[SIMULATED GEO-AI ENGINE] Recibido análisis territorial para: "${prompt}".\n\nResultados recomendados:\n- Coeficiente de ocupación urbana óptimo: 0.74\n- Capacidad de red local: NOMINAL\n- Restricciones jurídicas: Ninguna detectada en SNR/VUR.\n- Zona de amortiguación ambiental: 100m.`,
        model: "llama-3.3-70b-versatile (Simulated)",
        simulated: true
      });
    }

    // 4. Execute Real Groq Inference
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an advanced GeoAI Spatial Intelligence expert for DevGiz Engineering. Help users with multipurpose cadastre, territorial planning, PostGIS SQL queries, LADM_COL, and GIS data formats. Respond in Spanish, keep it professional, structured, and engineering-focused.'
        },
        {
          role: 'user',
          content: `Prompt: ${prompt}\nContext data: ${contextJson}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1500,
    });

    return NextResponse.json({
      success: true,
      text: completion.choices[0]?.message?.content || "No response received from AI model.",
      model: "llama-3.3-70b-versatile",
      simulated: false
    });

  } catch (error) {
    console.error("❌ Groq API route error:", error);
    return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
  }
}
