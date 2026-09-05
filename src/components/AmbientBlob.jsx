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
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  function resolveHue(el) {
    const zone = el?.closest?.("[data-blob]");
    const key = zone?.dataset?.blob;
    return HUES[key] ?? 0;
  }

  // Desktop only — this is a hover-trail effect and doesn't translate to a
  // single discrete tap. On mobile, ClickCritter + ClickRipple already give
  // tap feedback; stacking a third reaction on every tap reads as noisy
  // rather than premium, so this component simply renders nothing there.
  useEffect(() => {
    if (reduced || mobile) return;

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
  }, [reduced, mobile]);

  if (reduced || mobile) return null;

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full transition-[filter] duration-500 ease-out will-change-transform"
      style={{
        width: 620,
        height: 620,
        filter: `hue-rotate(${hue}deg)`,
        background:
          "radial-gradient(circle, rgb(var(--color-accent) / 0.16) 0%, rgb(var(--color-accent) / 0.05) 45%, transparent 72%)",
        opacity: 0.9,
        transition: "filter 0.5s ease-out",
      }}
    />
  );
}
