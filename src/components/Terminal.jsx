import { useEffect, useRef, useState } from "react";
import { profile } from "../lib/data";

const PROMPT = "guest@abdulhaq:~$";

function useCommands() {
  return function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return null;

    switch (cmd) {
      case "help":
        return [
          "available commands:",
          "  whoami       — quick summary",
          "  skills       — core stack",
          "  projects     — what I've shipped",
          "  contact      — how to reach me",
          "  github       — open my profile",
          "  sudo hire-me — you know what to do",
          "  clear        — clear the terminal",
        ];
      case "whoami":
        return [
          "Abdul Haq — full-stack developer.",
          "JavaScript · React · Node.js · Express · MongoDB.",
        ];
      case "skills":
        return [
          "frontend : React, Vite, Tailwind CSS",
          "backend  : Node.js, Express, REST APIs, JWT",
          "database : MongoDB, Mongoose, MySQL",
        ];
      case "projects":
        return [
          "OptimusBlog     — MERN blogging platform",
          "OptimusPM       — Kanban project management",
          "Real-Time Chat  — Socket.io messaging app",
          "→ scroll up to the Projects section for details",
        ];
      case "contact":
        return [`email : ${profile.email}`, `github: ${profile.github}`];
      case "github":
        window.open(profile.github, "_blank", "noreferrer");
        return ["opening github.com/TheHaqHub ↗"];
      case "sudo hire-me":
        window.setTimeout(() => {
          window.location.href = `mailto:${profile.email}`;
        }, 700);
        return ["permission granted.", "opening your email client…"];
      case "clear":
        return "__CLEAR__";
      default:
        return [`command not found: ${cmd}`, "type 'help' for options"];
    }
  };
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: "output", text: "welcome. type 'help' to get started." },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const cmdHistory = useRef([]);
  const historyPointer = useRef(-1);

  const run = useCommands();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = value;
    if (!cmd.trim()) return;

    cmdHistory.current.push(cmd);
    historyPointer.current = cmdHistory.current.length;

    const result = run(cmd);
    setValue("");

    if (result === "__CLEAR__") {
      setHistory([]);
      return;
    }

    setHistory((h) => [
      ...h,
      { type: "input", text: cmd },
      ...(result || []).map((line) => ({ type: "output", text: line })),
    ]);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.current.length === 0) return;
      historyPointer.current = Math.max(0, historyPointer.current - 1);
      setValue(cmdHistory.current[historyPointer.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistory.current.length === 0) return;
      historyPointer.current = Math.min(cmdHistory.current.length, historyPointer.current + 1);
      setValue(cmdHistory.current[historyPointer.current] ?? "");
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="border border-hairline rounded-sm bg-panel overflow-hidden cursor-text"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-hairline bg-panel2">
        <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
        <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
        <span className="w-2.5 h-2.5 rounded-full bg-hairline" />
        <span className="ml-3 font-mono text-[11px] text-faint">terminal</span>
      </div>

      <div
        ref={scrollRef}
        className="h-[220px] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed"
      >
        {history.map((line, i) =>
          line.type === "input" ? (
            <div key={i} className="text-ink">
              <span className="text-signal">{PROMPT}</span> {line.text}
            </div>
          ) : (
            <div key={i} className="text-muted whitespace-pre-wrap">
              {line.text}
            </div>
          )
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-0.5">
          <span className="text-signal shrink-0">{PROMPT}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Portfolio terminal input"
            className="flex-1 bg-transparent outline-none text-ink caret-signal min-w-0"
          />
        </form>
      </div>
    </div>
  );
}
