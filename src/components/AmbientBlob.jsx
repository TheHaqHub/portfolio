import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

// Warm hue variants — stays in the orange family but genuinely shifts
// depending on what part of the site you're near.
const HUES = {
  orange: 0,
  amber: 22,
  coral: -18,
  rust: -34,
};

export default function AmbientBlob() {
  const blobRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);
  const [pulse, setPulse] = useState(false);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  function resolveHue(el) {
    const zone = el?.closest?.("[data-blob]");
    const key = zone?.dataset?.blob;
    return HUES[key] ?? 0;
  }

  useEffect(() => {
    if (reduced) return;

    if (!mobile) {
      let raf = null;
      const onMove = (e) => {
        target.current = { x: e.clientX, y: e.clientY };
        setHue(resolveHue(e.target));
      };
      const tick = () => {
        pos.current.x += (target.current.x - pos.current.x) * 0.055;
        pos.current.y += (target.current.y - pos.current.y) * 0.055;
        if (blobRef.current) {
          blobRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
        }
        raf = requestAnimationFrame(tick);
      };
      window.addEventListener("pointermove", onMove);
      raf = requestAnimationFrame(tick);
      return () => {
        window.removeEventListener("pointermove", onMove);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    // Mobile: pulse a colored blob at the tap point, then let it settle.
    const onDown = (e) => {
      const point = e.touches ? e.touches[0] : e;
      target.current = { x: point.clientX, y: point.clientY };
      pos.current = { ...target.current };
      setHue(resolveHue(e.target));
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      setPulse(true);
      window.setTimeout(() => setPulse(false), 700);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduced, mobile]);

  if (reduced) return null;

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full transition-[filter] duration-500 ease-out will-change-transform"
      style={{
        width: mobile ? 260 : 620,
        height: mobile ? 260 : 620,
        filter: `hue-rotate(${hue}deg)`,
        background:
          "radial-gradient(circle, rgb(var(--color-accent) / 0.16) 0%, rgb(var(--color-accent) / 0.05) 45%, transparent 72%)",
        opacity: mobile ? (pulse ? 1 : 0) : 0.9,
        transition: mobile
          ? "opacity 0.7s ease-out, filter 0.4s ease-out"
          : "filter 0.5s ease-out",
      }}
    />
  );
}
