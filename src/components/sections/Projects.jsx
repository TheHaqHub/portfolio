import { projects } from "../../lib/data";
import ProjectCard from "./ProjectCard";
import Reveal from "../Reveal";
import MobileCarousel from "../MobileCarousel";

export default function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-hairline">
      <div className="container-x">
        <Reveal>
          <span className="section-num text-sm">04</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 mb-4 text-ink">
            Projects
          </h2>
          <p className="text-muted max-w-lg mb-14">
            Full-stack builds from an internship track and independent work —
            each one deployed, not just committed.
          </p>
        </Reveal>

        {/* Mobile: swipeable carousel */}
        <div className="sm:hidden">
          <MobileCarousel
            items={projects}
            keyExtractor={(p) => p.id}
            renderItem={(p, i) => <ProjectCard project={p} index={i} static />}
          />
        </div>

        {/* Tablet/desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
