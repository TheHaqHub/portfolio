import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "../../lib/data";
import Reveal from "../Reveal";

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === active);

  return (
    <section id="skills" className="py-24 md:py-32 border-t border-hairline">
      <div className="container-x">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="section-num text-sm">02</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3 text-ink">
              What I work with
            </h2>
          </div>
          <p className="text-sm text-faint max-w-xs font-mono">
            JS / React / Node / Express / MongoDB — the core. Everything
            else supports it.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={0.1} className="grid md:grid-cols-[280px_1fr] gap-8">
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1 pb-2 md:pb-0 -mx-1 px-1">
            {skillCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                whileHover={{ x: active === cat.id ? 0 : 4 }}
                whileTap={{ scale: 0.97 }}
                className={`relative text-left shrink-0 md:shrink px-4 py-3 rounded-sm border transition-colors whitespace-nowrap md:whitespace-normal overflow-hidden ${
                  active === cat.id
                    ? "border-signal bg-panel text-ink"
                    : "border-hairline text-muted hover:border-faint"
                }`}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="skill-tab-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-signal"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="font-display text-[15px]">{cat.label}</span>
                {cat.core && (
                  <span className="ml-2 font-mono text-[10px] text-signal align-middle">
                    core
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <div className="border border-hairline rounded-sm bg-panel min-h-[240px] p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-xs text-muted mb-6">
                  {current.blurb}
                </p>
                <motion.div
                  className="flex flex-wrap gap-2.5"
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
                >
                  {current.items.map((item) => (
                    <motion.span
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 8, scale: 0.94 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-sm px-3 py-1.5 rounded-sm border border-hairline text-ink bg-panel2 hover:border-signal transition-colors"
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
