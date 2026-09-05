import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { profile } from "../../lib/data";
import Reveal from "../Reveal";

const REPOS = [
  {
    name: "OptimusAutomate_OptimusBlog",
    desc: "MERN blogging platform — auth, rich text, image uploads",
    url: "https://github.com/TheHaqHub/OptimusAutomate_OptimusBlog",
    lang: "JavaScript",
  },
  {
    name: "OptimusAutomate_OptimusPM",
    desc: "Kanban-style project management app",
    url: "https://github.com/TheHaqHub/OptimusAutomate_OptimusPM",
    lang: "JavaScript",
  },
  {
    name: "OptimusAutomate_RealTimeChat",
    desc: "Real-time chat app with Socket.io + JWT auth",
    url: "https://github.com/TheHaqHub/OptimusAutomate_RealTimeChat",
    lang: "JavaScript",
  },
  {
    name: "sabeel-academy",
    desc: "Next.js project — early stage",
    url: "https://github.com/TheHaqHub/sabeel-academy",
    lang: "TypeScript",
  },
];

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val}</span>;
}

export default function GithubSection() {
  const [chartFailed, setChartFailed] = useState(false);

  return (
    <section id="github" className="py-24 md:py-32 border-t border-hairline">
      <div className="container-x">
        <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-4">
          <div>
            <span className="section-num text-sm">05</span>
            <h2 className="font-display text-3xl md:text-4xl mt-3 text-ink">
              GitHub activity
            </h2>
          </div>
          <p className="font-mono text-sm text-signal">
            <Counter to={REPOS.length} /> repos shown
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-muted max-w-lg mb-10">
            Feature branches, pull requests, and merge conflicts resolved as
            part of real collaborative workflows — not just solo commits.
          </p>
        </Reveal>

        <Reveal variant="scale" delay={0.1} className="border border-hairline rounded-sm bg-panel p-6 md:p-8 mb-10">
          <div className="flex items-center justify-between mb-5 font-mono text-xs text-faint">
            <span>contribution graph</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-signal hover:underline"
            >
              @{profile.githubUser} ↗
            </a>
          </div>

          {!chartFailed ? (
            <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
              <img
                src={`https://ghchart.rshah.org/ed601a/${profile.githubUser}`}
                alt={`GitHub contribution chart for ${profile.githubUser}`}
                className="h-[100px] sm:h-auto sm:w-full max-w-none sm:max-w-full"
                loading="lazy"
                onError={() => setChartFailed(true)}
              />
            </div>
          ) : (
            <div className="py-10 text-center text-muted text-sm">
              Live contribution graph unavailable right now — view activity
              directly on{" "}
              <a
                href={`${profile.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-signal hover:underline"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {REPOS.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="block border border-hairline rounded-sm p-5 transition-colors hover:border-signal"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-ink truncate">
                  {repo.name}
                </span>
                <span className="font-mono text-[11px] text-faint shrink-0 ml-2">
                  {repo.lang}
                </span>
              </div>
              <p className="text-sm text-muted mt-2">{repo.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
