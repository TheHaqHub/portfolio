import { useEffect, useRef, useState } from "react";

export default function MobileCarousel({ items, renderItem, keyExtractor }) {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const cardWidth = el.firstElementChild?.getBoundingClientRect().width || 1;
        const gap = 16;
        const index = Math.round(el.scrollLeft / (cardWidth + gap));
        setActive(Math.max(0, Math.min(items.length - 1, index)));
        raf = null;
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  function goTo(i) {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[i];
    if (card) {
      el.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    }
  }

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div key={keyExtractor(item, i)} className="shrink-0 w-[86vw] snap-center">
            {renderItem(item, i)}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {items.map((item, i) => (
            <button
              key={keyExtractor(item, i)}
              onClick={() => goTo(i)}
              aria-label={`Go to item ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? "w-6 bg-signal" : "w-1.5 bg-hairline"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
