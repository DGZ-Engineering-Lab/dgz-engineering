// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a user loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 0.3, // 30% of transactions

  // Session Replay (free tier: 50 replays/mo)
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
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
