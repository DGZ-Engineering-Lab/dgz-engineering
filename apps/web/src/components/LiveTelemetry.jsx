"use client";

import { useSyncExternalStore } from "react";

// Shared ticker for the hero HUD readouts. Keeping the 450 ms interval in its
// own tiny store means only the <text> nodes that display a value re-render,
// instead of the whole home page tree on every tick.
const INITIAL = {
  lat: "4°35'12.45''N",
  lng: "75°23'41.08''W",
  alt: "45.22 m",
  ping: "12 ms",
};

let snapshot = INITIAL;
const listeners = new Set();
let timer = null;

function tick() {
  if (document.hidden) return;
  snapshot = {
    lat: `N 4°35'${(12.45 + Math.random() * 0.25).toFixed(2)}''`,
    lng: `W 75°23'${(41.08 + Math.random() * 0.25).toFixed(2)}''`,
    alt: `${(45.10 + Math.random() * 0.3).toFixed(2)} m`,
    ping: `${Math.floor(8 + Math.random() * 10)} ms`,
  };
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  if (!timer) timer = setInterval(tick, 450);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => INITIAL;

export default function LiveTelemetry({ field }) {
  const values = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return values[field];
}
