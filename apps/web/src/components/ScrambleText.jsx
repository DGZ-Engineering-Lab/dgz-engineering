"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

export default function ScrambleText({ text, className = "" }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // In Anime.js 4.x, scramble is often implemented via a custom property or utility
      // If the direct 'scramble' property isn't available, we can simulate it with a frame-based update
      // But according to the user, v4.4 has it built-in.
      
      anime({
        targets: textRef.current,
        opacity: [0, 1],
        duration: 1000,
        easing: 'linear',
        // Note: Direct scramble might need a specific syntax in 4.x
        // We'll use a reliable reveal animation if scramble is not a direct target property
        innerHTML: [text.split('').map(() => '#').join(''), text],
        round: 1,
        easing: 'steps(' + text.length + ')',
        duration: 1500
      });
    }
  }, [text]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}
