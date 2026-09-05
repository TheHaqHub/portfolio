import { motion } from "framer-motion";
import { profile } from "../../lib/data";
import HeroVisual from "../three/HeroVisual";
import Magnetic from "../Magnetic";
import ScrambleText from "../ScrambleText";

export default function Hero({ scrollProgress }) {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container-x grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-sm text-signal mb-5 flex items-center gap-2"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-signal"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {profile.roleLong}
          </motion.p>

          <h1 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-ink">
            <ScrambleText text={profile.name} speed={22} delay={150} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="font-display text-2xl sm:text-3xl text-signal mt-2"
          >
            {profile.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68 }}
            className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic
              href="#projects"
              strength={0.3}
              className="inline-block bg-signal text-oncolor font-medium text-sm px-6 py-3 rounded-sm hover:bg-signalDim transition-colors"
            >
              View Projects
            </Magnetic>
            <Magnetic
              href="#contact"
              strength={0.3}
              className="inline-block border border-hairline text-ink font-medium text-sm px-6 py-3 rounded-sm hover:border-signal hover:text-signal transition-colors"
            >
              Let's Connect
            </Magnetic>
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
              className="font-mono text-sm text-muted hover:text-signal transition-colors px-2 py-3"
            >
              GitHub ↗
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative h-auto md:h-[440px]"
        >
          <HeroVisual scrollProgress={scrollProgress} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-faint hover:text-signal transition-colors"
      >
        <span className="font-mono text-[10px] tracking-wide">scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-current"
        />
      </motion.a>
    </section>
  );
}
