import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

const START = { x: 26, y: 58 }; // near the logo — where the cat first wanders in from

function Cat() {
  return (
    <svg width="34" height="30" viewBox="0 0 34 30" fill="none">
      {/* tail */}
      <path
        d="M27 25c4.5-2 5.5-8.5 2-13"
        stroke="rgb(var(--color-accent))"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* body / head, sitting silhouette */}
      <path
        d="M9 29c-2.2-8.6 1-16 8-16s10.2 7.4 8 16z"
        fill="rgb(var(--color-accent))"
      />
      {/* ears */}
      <path d="M9.5 14l2-6.5 4.3 4.3z" fill="rgb(var(--color-accent))" />
      <path d="M24.5 14l-2-6.5-4.3 4.3z" fill="rgb(var(--color-accent))" />
      {/* face */}
      <circle cx="13.2" cy="18.5" r="1.5" fill="rgb(var(--color-on-accent))" />
      <circle cx="20.8" cy="18.5" r="1.5" fill="rgb(var(--color-on-accent))" />
      <path
        d="M15.2 22c1.1.9 2.5.9 3.6 0"
        stroke="rgb(var(--color-on-accent))"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function ClickCritter() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState(START);
  const [duration, setDuration] = useState(1.2);
  const [flip, setFlip] = useState(false);
  const [walking, setWalking] = useState(false);
  const lastPos = useRef(START);
  const walkTimer = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const onDown = (e) => {
      const point = e.touches ? e.touches[0] : e;
      const from = lastPos.current;
      const to = { x: point.clientX, y: point.clientY };
      const dist = Math.hypot(to.x - from.x, to.y - from.y);

      // Gentle, unhurried walking pace — not an instant jump.
      const walkDuration = Math.min(2.8, Math.max(0.9, dist / 380));

      setFlip(to.x < from.x);
      setDuration(walkDuration);
      setTarget(to);
      setVisible(true);
      setWalking(true);
      lastPos.current = to;

      window.clearTimeout(walkTimer.current);
      walkTimer.current = window.setTimeout(() => setWalking(false), walkDuration * 1000);
    };

    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.clearTimeout(walkTimer.current);
    };
  }, [reduced]);

  if (reduced || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden">
      <motion.div
        animate={{ x: target.x, y: target.y }}
        transition={{ duration, ease: [0.45, 0.05, 0.55, 0.95] }}
        className="absolute top-0 left-0"
        style={{ marginLeft: -17, marginTop: -20, scaleX: flip ? -1 : 1 }}
      >
        <motion.div
          animate={
            walking
              ? { y: [0, -4, 0, -3, 0], rotate: [0, -3, 0, 3, 0] }
              : { y: [0, -1.5, 0], rotate: 0 }
          }
          transition={
            walking
              ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Cat />
        </motion.div>
      </motion.div>
    </div>
  );
}
