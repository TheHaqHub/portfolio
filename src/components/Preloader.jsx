import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Preloader({ onDone }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      onDone?.();
      return;
    }

    let p = 0;
    const progressInterval = window.setInterval(() => {
      p += Math.random() * 12 + 6;
      if (p >= 100) {
        p = 100;
        window.clearInterval(progressInterval);
        window.setTimeout(() => setExiting(true), 420);
      }
      setProgress(Math.min(100, Math.round(p)));
    }, 100);

    return () => window.clearInterval(progressInterval);
  }, [reduced, onDone]);

  useEffect(() => {
    if (!exiting) return;
    const t = window.setTimeout(() => {
      setDone(true);
      onDone?.();
    }, 750);
    return () => window.clearTimeout(t);
  }, [exiting, onDone]);

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* curtain fill — sits behind the content, splits apart to reveal the site */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2 bg-base"
        animate={exiting ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-base"
        animate={exiting ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        {/* thick bar sliding in from above */}
        <motion.div
          className="h-2 md:h-3 bg-signal"
          initial={{ width: "0%" }}
          animate={{ width: exiting ? "0%" : "72%" }}
          transition={{ duration: exiting ? 0.4 : 0.7, ease: [0.16, 1, 0.3, 1], delay: exiting ? 0 : 0.05 }}
          style={{ marginBottom: "clamp(1rem, 4vw, 2.25rem)" }}
        />

        {/* code-styled reveal — reads as a JSX component tag */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{
            opacity: exiting ? 0 : 1,
            letterSpacing: exiting ? "0.1em" : "0em",
          }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="font-mono font-bold text-[9vw] sm:text-6xl md:text-7xl leading-none tracking-tight text-center px-6 break-words"
        >
          <span className="text-signal">&lt;</span>
          <span className="text-ink">AbdulHaq</span>
          <span className="text-signal"> /&gt;</span>
          <motion.span
            className="inline-block text-signal"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          >
            _
          </motion.span>
        </motion.div>

        {/* thick bar sliding in from below */}
        <motion.div
          className="h-2 md:h-3 bg-signal"
          initial={{ width: "0%" }}
          animate={{ width: exiting ? "0%" : "72%" }}
          transition={{ duration: exiting ? 0.4 : 0.7, ease: [0.16, 1, 0.3, 1], delay: exiting ? 0 : 0.05 }}
          style={{ marginTop: "clamp(1rem, 4vw, 2.25rem)" }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-10 font-mono text-xs text-faint tracking-wide"
        >
          {progress}%
        </motion.div>
      </div>
    </div>
  );
}
