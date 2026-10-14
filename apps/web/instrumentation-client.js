// Sentry browser setup. Next.js 15+ only runs this file on the client;
// the old sentry.client.config.js is no longer loaded.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
//
// The SDK (~75 KB gzipped) is imported after the page is idle, and only when
// a DSN is configured, so error monitoring never delays the first render.

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

async function initSentry() {
  const Sentry = await import("@sentry/nextjs");

  Sentry.init({
    dsn,

    // Performance Monitoring
    tracesSampleRate: 0.3, // 30% of transactions

    // Session Replay (free tier: 50 replays/mo)
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
      Sentry.feedbackIntegration({
        colorScheme: "dark",
        buttonLabel: "Report Issue",
        submitButtonLabel: "Send",
        formTitle: "DGZ Bug Report",
      }),
    ],

    // Filter noisy errors
    ignoreErrors: [
      "ResizeObserver loop",
      "Non-Error promise rejection",
      "Loading chunk",
    ],

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
