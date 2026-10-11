'use client';

import { useEffect } from 'react';

// posthog-js is ~50 KB gzipped. It is loaded on demand, after the page is idle,
// and only when a key is configured, so it never blocks the first render.
// Components read it through `window.posthog`.
export function PostHogProvider({ children }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    const load = () =>
      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
          person_profiles: 'identified_only',
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          // Respect user privacy
          respect_dnt: true,
          // Session recording (free tier: 5K sessions/mo)
          enable_recording_console_log: false,
        });
        window.posthog = posthog;
      });

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 2000);
    return () => clearTimeout(id);
  }, []);

  return children;
}
