import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../lib/data";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#freelance", label: "Freelance" },
  { href: "#contact", label: "Contact" },
];

function NavLink({ href, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative hover:text-signal transition-colors py-1"
    >
      {label}
      <motion.span
        className="absolute left-0 -bottom-0.5 h-px bg-signal"
        initial={{ width: 0 }}
        animate={{ width: hovered ? "100%" : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-base/90 backdrop-blur border-b border-hairline" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex items-center justify-between h-16">
        <a href="#top" className="font-display text-lg tracking-tight text-ink group">
          Abdul
          <motion.span
            className="text-signal inline-block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            .
          </motion.span>
          Haq
        </a>

        <div className="hidden md:flex items-center gap-8 font-mono text-[13px] text-muted">
          {LINKS.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} />
          ))}
          <motion.a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="text-ink border border-hairline rounded-sm px-3 py-1.5 hover:border-signal hover:text-signal transition-colors"
          >
            GitHub
          </motion.a>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        <button
          className="relative z-[110] text-ink flex flex-col items-end gap-[5px] w-6"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="h-[1.5px] w-6 bg-current"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="h-[1.5px] w-4 bg-current"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6, width: 24 } : { rotate: 0, y: 0, width: 6 }}
            transition={{ duration: 0.25 }}
            className="h-[1.5px] bg-current"
          />
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="md:hidden fixed inset-0 z-[100] bg-base"
          >
            <div className="container-x h-full flex flex-col justify-center pb-20">
              <p className="font-mono text-xs text-signal mb-8">// navigate</p>
              <nav className="flex flex-col gap-1">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline gap-4 py-3 border-b border-hairline"
                  >
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    <span className="font-display text-4xl text-ink group-active:text-signal transition-colors">
                      {l.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-10 font-mono text-sm text-signal inline-flex items-center gap-1.5"
              >
                github.com/TheHaqHub ↗
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
