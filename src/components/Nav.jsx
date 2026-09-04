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
          className="text-ink"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="font-mono text-sm">{open ? "close" : "menu"}</span>
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-hairline bg-base overflow-hidden"
          >
            <div className="container-x py-4 flex flex-col gap-4 font-mono text-sm text-muted">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-signal">
                  {l.label}
                </a>
              ))}
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-signal">
                GitHub ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
