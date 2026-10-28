// Sentry browser setup. Next.js 15+ only runs this file on the client;
// the old sentry.client.config.js is no longer loaded.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
//
// The SDK (~75 KB gzipped) is imported after the page is idle, and only when
// a DSN is configured, so error monitoring never delays the first render.
//
// Minimización de datos: solo errores y trazas de rendimiento. Sin Session Replay
// (grababa la pantalla del visitante) ni widget de feedback (pedía nombre y correo),
// y sin PII por defecto (IP, cookies, encabezados de usuario).

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

async function initSentry() {
  const Sentry = await import("@sentry/nextjs");

  Sentry.init({
    dsn,

    // No enviar IP, cookies ni datos de usuario
    sendDefaultPii: false,

    // Performance Monitoring
    tracesSampleRate: 0.3, // 30% of transactions

    integrations: [Sentry.browserTracingIntegration()],

    // Filter noisy errors
    ignoreErrors: ["ResizeObserver loop", "Non-Error promise rejection", "Loading chunk"],

    environment: process.env.NODE_ENV,
  });
}

if (dsn) {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initSentry, { timeout: 4000 });
  } else {
    setTimeout(initSentry, 2000);
  }
}

export const onRouterTransitionStart = (href) => {
  if (dsn && typeof window !== "undefined") {
    import("@sentry/nextjs")
      .then((Sentry) => {
        Sentry.captureRouterTransitionStart?.(href);
      })
      .catch(() => {});
  }
};
