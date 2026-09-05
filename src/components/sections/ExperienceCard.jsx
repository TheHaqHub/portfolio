import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ExperienceCard({ exp }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-hairline rounded-sm bg-panel overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-1.5 px-5 py-3 border-b border-hairline bg-panel2 font-mono text-xs text-faint">
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="ml-2 truncate">{exp.id}</span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-xl text-ink">{exp.org}</h3>
        <p className="text-sm text-signal mt-1">{exp.role}</p>
        <p className="mt-3 text-[14.5px] text-muted leading-relaxed">{exp.summary}</p>

        {exp.points.length > 0 && (
          <>
            <button
              onClick={() => setOpen((o) => !o)}
              className="mt-4 font-mono text-xs text-signal inline-flex items-center gap-1.5 self-start"
              aria-expanded={open}
            >
              {open ? "hide details" : "show details"}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                ⌄
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden space-y-2 mt-3"
                >
                  {exp.points.map((p) => (
                    <li key={p} className="text-sm text-muted flex gap-2.5">
                      <span className="text-signal font-mono shrink-0">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}

        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {exp.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2.5 py-1 border border-hairline rounded-sm text-faint"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
