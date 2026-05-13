"use client";

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";

export default function ScrambleText({ text, className = "" }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      animate(textRef.current, {
        duration: 1500,
        text: scrambleText(text),
        easing: 'linear'
      });
    }
  }, [text]);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
}
