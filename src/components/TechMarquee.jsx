import { useReducedMotion } from "../hooks/useReducedMotion";

const STACK = ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git / GitHub"];

export default function TechMarquee() {
  const reduced = useReducedMotion();
  // Duplicated 4x (not 2x) so the total strip is always comfortably wider
  // than even large desktop/ultra-wide viewports — with only 2 copies, a
  // wide screen could show more of the container's width than the content
  // covers, exposing a brief blank gap at the loop point.
  const items = [...STACK, ...STACK, ...STACK, ...STACK];

  return (
    <div className="border-y border-hairline bg-panel overflow-hidden py-4 group">
      <div
        className={`flex gap-10 whitespace-nowrap w-max ${
          reduced ? "" : "animate-marquee group-hover:[animation-play-state:paused]"
        }`}
      >
        {items.map((item, i) => (
          <span key={i} className="font-mono text-sm text-faint flex items-center gap-3">
            <span className="text-signal">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
