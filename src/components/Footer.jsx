import { motion } from "framer-motion";
import { profile } from "../lib/data";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-hairline py-8"
    >
      <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-faint font-mono">
        <p>© {new Date().getFullYear()} {profile.name}. Built from scratch.</p>
        <div className="flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-signal transition-colors">
            Email
          </a>
          <a href="#top" className="hover:text-signal transition-colors">
            Back to top
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
