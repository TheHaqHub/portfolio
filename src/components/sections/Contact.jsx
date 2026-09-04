import { motion } from "framer-motion";
import { profile, contact } from "../../lib/data";
import Magnetic from "../Magnetic";
import Terminal from "../Terminal";

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-36 border-t border-hairline relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--color-accent) / 0.1) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-x relative grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-num text-sm">07</span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl mt-4 text-ink leading-tight"
          >
            {contact.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-2xl text-muted mt-2"
          >
            {contact.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic
              href={`mailto:${profile.email}`}
              strength={0.3}
              className="inline-flex items-center bg-signal text-oncolor font-medium text-sm px-6 py-3 rounded-sm hover:bg-signalDim transition-colors"
            >
              {profile.email}
            </Magnetic>
            <Magnetic
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              strength={0.3}
              className="inline-flex items-center border border-hairline text-ink font-medium text-sm px-6 py-3 rounded-sm hover:border-signal hover:text-signal transition-colors"
            >
              GitHub ↗
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.42 }}
            className="mt-6 inline-flex items-center gap-2.5 font-mono text-xs text-muted"
          >
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-signal"
                animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
            </span>
            {profile.availability}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Terminal />
          <p className="mt-3 font-mono text-[11px] text-faint text-center">
            try typing <span className="text-signal">help</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
