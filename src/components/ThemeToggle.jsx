import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      data-cursor-hover
      className={`relative w-[52px] h-[28px] rounded-full border border-hairline bg-panel2 flex items-center px-1 transition-colors ${className}`}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className="w-[20px] h-[20px] rounded-full bg-signal flex items-center justify-center text-[10px]"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        <span aria-hidden="true" className="text-oncolor">
          {isDark ? "☾" : "☀"}
        </span>
      </motion.span>
    </button>
  );
}
