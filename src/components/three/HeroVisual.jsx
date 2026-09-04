import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsMobile } from "../../hooks/useIsMobile";

function StaticSignalMark({ reduced }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      role="img"
      aria-label="Abstract wireframe network representing full-stack architecture"
    >
      <motion.svg
        viewBox="0 0 400 260"
        className="w-full max-w-[420px] h-auto"
        animate={
          reduced
            ? undefined
            : { rotate: [0, 2.5, 0, -2.5, 0], scale: [1, 1.02, 1, 1.02, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.polygon
          points="200,20 340,90 340,180 200,240 60,180 60,90"
          fill="none"
          style={{ stroke: "rgb(var(--color-accent))" }}
          strokeOpacity="0.3"
          strokeWidth="1.5"
          animate={reduced ? undefined : { strokeOpacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <path
          d="M40 150 L90 150 L105 100 L120 190 L135 130 L150 150 L175 150 L190 115 L215 150 L240 150 L255 95 L270 195 L285 120 L300 150 L360 150"
          fill="none"
          style={{ stroke: "rgb(var(--color-accent2))" }}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </motion.svg>
    </div>
  );
}

export default function HeroVisual({ scrollProgress = 0 }) {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const containerRef = useRef(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [ready, setReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const useStatic = reduced || mobile || webglFailed;

  useEffect(() => {
    if (reduced || mobile) return;
    let mounted = true;
    let cleanup = () => {};

    import("./HeroScene.js")
      .then(({ createHeroScene }) => {
        if (!mounted || !canvasRef.current || !containerRef.current) return;

        let scene;
        try {
          scene = createHeroScene(canvasRef.current, { mobile: false });
        } catch (err) {
          console.warn("3D hero scene failed to initialize, falling back to static visual:", err);
          setWebglFailed(true);
          return;
        }

        sceneRef.current = scene;
        scene.start();
        setReady(true);

        const onResize = () => {
          if (!containerRef.current) return;
          const { clientWidth, clientHeight } = containerRef.current;
          scene.resize(clientWidth, clientHeight);
        };
        const onPointerMove = (e) => {
          const rect = containerRef.current.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          scene.setPointer(nx, ny);
        };
        const onVisibility = () => {
          if (document.hidden) scene.stop();
          else scene.start();
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("pointermove", onPointerMove);
        document.addEventListener("visibilitychange", onVisibility);
        onResize();

        cleanup = () => {
          window.removeEventListener("resize", onResize);
          window.removeEventListener("pointermove", onPointerMove);
          document.removeEventListener("visibilitychange", onVisibility);
          scene.dispose();
        };
      })
      .catch((err) => {
        console.warn("3D hero scene module failed to load, falling back to static visual:", err);
        setWebglFailed(true);
      });

    return () => {
      mounted = false;
      cleanup();
    };
  }, [reduced, mobile]);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.setScrollT(scrollProgress);
    }
  }, [scrollProgress]);

  if (useStatic) {
    return (
      <div className="w-full h-full min-h-[320px]">
        <StaticSignalMark reduced={reduced} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[380px]">
      <canvas
        ref={canvasRef}
        className={`w-full h-full transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
