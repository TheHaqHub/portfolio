import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const LINES = [
  [
    { t: "const ", c: "muted" },
    { t: "dev", c: "ink" },
    { t: " = {", c: "faint" },
  ],
  [
    { t: "  name", c: "ink" },
    { t: ": ", c: "faint" },
    { t: '"Abdul Haq"', c: "signal" },
    { t: ",", c: "faint" },
  ],
  [
    { t: "  stack", c: "ink" },
    { t: ": [", c: "faint" },
    { t: '"React"', c: "signal" },
    { t: ", ", c: "faint" },
    { t: '"Node"', c: "signal" },
    { t: ", ", c: "faint" },
    { t: '"MongoDB"', c: "signal" },
    { t: "],", c: "faint" },
  ],
  [
    { t: "  status", c: "ink" },
    { t: ": ", c: "faint" },
    { t: '"available"', c: "signal" },
    { t: ",", c: "faint" },
  ],
  [{ t: "};", c: "faint" }],
];

const COLOR_CLASS = {
  muted: "text-muted",
  ink: "text-ink",
  faint: "text-faint",
  signal: "text-signal",
};

export default function MobileHeroCode() {
  const reduced = useReducedMotion();
  const [run, setRun] = useState(0);
  const [visibleLines, setVisibleLines] = useState(reduced ? LINES.length : 0);

  useEffect(() => {
    if (reduced) return;
    setVisibleLines(0);
    const timers = LINES.map((_, i) =>
      window.setTimeout(() => setVisibleLines(i + 1), 220 + i * 220)
    );
    return () => timers.forEach(window.clearTimeout);
  }, [run, reduced]);

  return (
    <button
      onClick={() => setRun((r) => r + 1)}
      aria-label="Replay code animation"
      className="w-full text-left border border-hairline rounded-sm bg-panel overflow-hidden active:border-signal transition-colors"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-hairline bg-panel2">
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="ml-2 font-mono text-[11px] text-faint">about.js</span>
      </div>

      <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[148px]">
        <AnimatePresence>
          {LINES.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              {line.map((tok, j) => (
                <span key={j} className={COLOR_CLASS[tok.c]}>
                  {tok.t}
                </span>
              ))}
              {i === visibleLines - 1 && i === LINES.length - 1 && (
                <motion.span
                  className="inline-block text-signal ml-0.5"
                  animate={reduced ? {} : { opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                >
                  ▍
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-5 pb-4 -mt-1">
        <span className="font-mono text-[10px] text-faint">tap to replay</span>
      </div>
    </button>
  );
}
