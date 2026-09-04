import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

let idCounter = 0;

function Critter() {
  return (
    <svg width="30" height="26" viewBox="0 0 30 26" fill="none">
      <ellipse cx="15" cy="15" rx="11" ry="8.5" fill="rgb(var(--color-accent))" />
      <circle cx="10.5" cy="12" r="1.6" fill="rgb(var(--color-on-accent))" />
      <circle cx="19.5" cy="12" r="1.6" fill="rgb(var(--color-on-accent))" />
      <path d="M6 21c-2 1-4 1-5.5 0" stroke="rgb(var(--color-accent))" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 21c2 1 4 1 5.5 0" stroke="rgb(var(--color-accent))" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 8c1.5-3 4-5 6-5" stroke="rgb(var(--color-accent))" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ClickCritter() {
  const [critters, setCritters] = useState([]);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (reduced) return;

    const onDown = (e) => {
      const now = Date.now();
      if (now - lastSpawn.current < 260) return; // avoid spam on rapid taps
      lastSpawn.current = now;

      const point = e.touches ? e.touches[0] : e;
      const id = idCounter++;
      const angle = Math.random() * Math.PI * 2;
      const distance = (mobile ? 90 : 160) + Math.random() * (mobile ? 70 : 120);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance * 0.6 - 20;

      setCritters((c) => [
        ...c,
        { id, x: point.clientX, y: point.clientY, dx, dy, flip: dx < 0 },
      ]);
      window.setTimeout(() => {
        setCritters((c) => c.filter((cr) => cr.id !== id));
      }, 950);
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduced, mobile]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <AnimatePresence>
        {critters.map((c) => (
          <motion.div
            key={c.id}
            initial={{ x: c.x, y: c.y, opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{
              x: c.x + c.dx,
              y: [c.y, c.y - 26, c.y + c.dy],
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1, 1, 0.7],
              rotate: c.flip ? -12 : 12,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 left-0"
            style={{ marginLeft: -15, marginTop: -13, scaleX: c.flip ? -1 : 1 }}
          >
            <Critter />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
