import { motion } from "framer-motion";

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(6px)", y: 10 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
};

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  as = "div",
  once = true,
  amount = 0.2,
}) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={VARIANTS[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({ children, className = "", stagger = 0.08, once = true, amount = 0.2 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, variant = "up", className = "", as = "div" }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp className={className} variants={VARIANTS[variant]} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Comp>
  );
}
