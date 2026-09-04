import { motion } from "framer-motion";
import { experience } from "../../lib/data";
import Reveal from "../Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-hairline">
      <div className="container-x">
        <Reveal>
          <span className="section-num text-sm">03</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 mb-14 text-ink">
            Experience
          </h2>
        </Reveal>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ x: 4 }}
              className="grid md:grid-cols-[220px_1fr] gap-4 md:gap-10 py-8 border-b border-hairline last:border-b-0"
            >
              <div>
                <h3 className="font-display text-xl text-ink">{exp.org}</h3>
                <p className="text-sm text-signal mt-1">{exp.role}</p>
              </div>

              <div>
                <p className="text-[15px] text-muted leading-relaxed max-w-2xl">
                  {exp.summary}
                </p>
                {exp.points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((p, pi) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: pi * 0.05 }}
                        className="text-sm text-muted flex gap-3"
                      >
                        <span className="text-signal font-mono shrink-0">›</span>
                        <span>{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <motion.span
                      key={t}
                      whileHover={{ y: -2 }}
                      className="font-mono text-[11px] px-2.5 py-1 border border-hairline rounded-sm text-faint hover:border-signal hover:text-signal transition-colors"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
