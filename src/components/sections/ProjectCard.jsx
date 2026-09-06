import { useRef } from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index, static: isStatic = false }) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 5}deg) rotateX(${
      -py * 5
    }deg) translateY(-4px)`;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(320px circle at ${
        (px + 0.5) * 100
      }% ${(py + 0.5) * 100}%, rgb(var(--color-accent) / 0.16), transparent 60%)`;
    }
  }
  function handleLeave() {
    if (ref.current) ref.current.style.transform = "";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  }

  const isPlaceholder = project.status;

  return (
    <motion.div
      initial={isStatic ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={isStatic ? { opacity: 1, y: 0, scale: 1 } : undefined}
      whileInView={isStatic ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={isStatic ? undefined : { once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: isStatic ? 0 : (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 150ms ease-out, border-color 200ms ease" }}
      className="relative group border border-hairline rounded-sm bg-panel overflow-hidden hover:border-signal will-change-transform"
    >
      <div
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 transition-[background] duration-150"
      />
      <div className="flex items-start justify-between gap-3 px-5 py-3 border-b border-hairline bg-panel2 font-mono text-xs text-faint">
        <div className="flex items-center gap-1.5 pt-0.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-hairline group-hover:bg-pulse transition-colors" />
          <span className="w-2 h-2 rounded-full bg-hairline group-hover:bg-signal transition-colors delay-75" />
          <span className="w-2 h-2 rounded-full bg-hairline group-hover:bg-signal transition-colors delay-150" />
          <span className="ml-2">{project.id}</span>
        </div>
        <span className={`text-right shrink-0 ${isPlaceholder ? "text-pulse" : "text-signal"}`}>
          {project.period}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-ink group-hover:text-signal transition-colors">
          {project.name}
        </h3>
        <p className="mt-3 text-[14.5px] text-muted leading-relaxed">
          {project.description}
        </p>

        {project.status && (
          <p className="mt-3 font-mono text-xs text-pulse">
            {project.status}
          </p>
        )}

        {project.features?.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="text-[13px] text-muted flex gap-2.5">
                <span className="text-signal shrink-0">·</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((s, si) => (
            <motion.span
              key={s}
              initial={isStatic ? false : { opacity: 0, y: 6 }}
              whileInView={isStatic ? undefined : { opacity: 1, y: 0 }}
              animate={isStatic ? { opacity: 1, y: 0 } : undefined}
              viewport={isStatic ? undefined : { once: true }}
              transition={{ duration: 0.3, delay: isStatic ? 0 : si * 0.025 }}
              className="font-mono text-[10.5px] px-2 py-1 rounded-sm border border-hairline text-faint group-hover:border-hairline transition-colors"
            >
              {s}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-5 font-mono text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:text-signal transition-colors inline-flex items-center gap-1 group/link"
            >
              Code
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5">↗</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-ink hover:text-signal transition-colors inline-flex items-center gap-1 group/link"
            >
              Live
              <span className="inline-block transition-transform group-hover/link:translate-x-0.5">↗</span>
            </a>
          )}
          {!project.github && !project.live && (
            <span className="text-faint">In development</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
