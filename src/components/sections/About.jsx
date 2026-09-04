import { motion } from "framer-motion";
import { principles } from "../../lib/data";
import Reveal from "../Reveal";
import QuoteRotator from "../QuoteRotator";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-hairline">
      <div className="container-x">
        <Reveal>
          <span className="section-num text-sm">01</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 mb-4 text-ink">
            How I build
          </h2>
          <p className="text-muted max-w-lg mb-14">
            A few things I hold to on every project, regardless of stack or
            client.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16">
          <div className="space-y-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-[auto_1fr] gap-5 py-6 border-b border-hairline last:border-b-0 group"
              >
                <span className="font-mono text-xs text-signal pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink group-hover:text-signal transition-colors">
                    {p.label}
                  </h3>
                  <p className="mt-1.5 text-[15px] text-muted leading-relaxed max-w-lg">
                    {p.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="md:sticky md:top-28 h-fit">
            <QuoteRotator />
          </div>
        </div>
      </div>
    </section>
  );
}
