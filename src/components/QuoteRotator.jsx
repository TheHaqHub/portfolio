import { useMemo } from "react";
import { motion } from "framer-motion";
import { quotes } from "../lib/data";

export default function QuoteRotator() {
  const quote = useMemo(() => quotes[Math.floor(Math.random() * quotes.length)], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="border border-hairline rounded-sm bg-panel p-8 relative overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute -top-6 -left-2 font-display text-[110px] leading-none text-signal/10 select-none"
      >
        "
      </span>
      <p className="relative font-display text-xl md:text-2xl text-ink leading-snug">
        {quote.text}
      </p>
      <p className="relative mt-4 font-mono text-xs text-signal">
        — {quote.author}
      </p>
      <p className="relative mt-6 font-mono text-[10px] text-faint">
        new quote every visit
      </p>
    </motion.div>
  );
}
