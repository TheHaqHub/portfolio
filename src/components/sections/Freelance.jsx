import { motion } from "framer-motion";
import { freelance } from "../../lib/data";
import Reveal from "../Reveal";

export default function Freelance() {
  return (
    <section id="freelance" className="py-24 md:py-32 border-t border-hairline">
      <div className="container-x grid md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
        <Reveal variant="left">
          <span className="section-num text-sm">06</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 text-ink">
            Freelance work
          </h2>
          <p className="mt-5 text-muted leading-relaxed max-w-sm">
            {freelance.intro} Alongside internship and product work, I've built and maintained sites for local
            businesses — real clients, real deadlines, real launch-day
            problems.
          </p>
        </Reveal>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="border border-hairline rounded-sm bg-panel divide-y divide-hairline"
        >
          {freelance.points.map((point) => (
            <motion.div
              key={point}
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: "rgba(237,96,26,0.06)" }}
              className="flex items-start gap-4 px-6 py-4"
            >
              <span className="text-signal font-mono mt-0.5">·</span>
              <p className="text-[15px] text-muted">{point}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
