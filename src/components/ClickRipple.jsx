import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

let idCounter = 0;

export default function ClickRipple() {
  const [ripples, setRipples] = useState([]);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  useEffect(() => {
    if (reduced) return;
    const onDown = (e) => {
      const id = idCounter++;
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((r) => r.filter((rp) => rp.id !== id));
      }, 650);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ opacity: 0.5, scale: 0 }}
            animate={{ opacity: 0, scale: mobile ? 3.5 : 5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-signal"
            style={{
              left: r.x,
              top: r.y,
              width: 14,
              height: 14,
              marginLeft: -7,
              marginTop: -7,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
