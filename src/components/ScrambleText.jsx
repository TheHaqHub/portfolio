import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01#_/{}";

export default function ScrambleText({ text, className = "", speed = 28, delay = 0 }) {
  const [display, setDisplay] = useState(text);
  const reduced = useReducedMotion();
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduced || doneRef.current) return;
    doneRef.current = true;

    let frame = 0;
    let raf = null;
    let timeoutId = null;
    const totalFrames = text.length * 3 + 12;

    function tick() {
      let out = "";
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch === " ") {
          out += " ";
        } else if (i < revealCount) {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(out);
      frame++;
      if (frame <= totalFrames) {
        raf = requestAnimationFrame(() => {
          timeoutId = window.setTimeout(tick, speed);
        });
      } else {
        setDisplay(text);
      }
    }

    const startTimeout = window.setTimeout(tick, delay);

    return () => {
      window.clearTimeout(startTimeout);
      window.clearTimeout(timeoutId);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text, speed, delay, reduced]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
