"use client";

import { useEffect, useState } from "react";
import Sprite from "./Sprite";

/* ↑↑↓↓←→←→BA — a rocket barrage for whoever remembers */
const CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const rocketRows = ["..b..", ".bbb.", ".bwb.", ".bbb.", "bbbbb", ".f.f."];

export default function KonamiCode() {
  const [launch, setLaunch] = useState(0);

  useEffect(() => {
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      /* on mismatch, ↑ restarts the run — an ↑↑ prefix survives a third ↑ */
      i = key === CODE[i] ? i + 1 : key === "ArrowUp" ? (i === 2 ? 2 : 1) : 0;
      if (i === CODE.length) {
        i = 0;
        setLaunch((n) => n + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!launch) return null;
  return (
    <div
      key={launch}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={i}
          className="rocket-up absolute bottom-0"
          style={{ left: `${6 + i * 8}%`, animationDelay: `${(i % 5) * 0.18}s` }}
        >
          <Sprite
            rows={rocketRows}
            palette={{ b: "#ffd54a", w: "#0a1445", f: "#ff7b00" }}
            px={3}
          />
        </span>
      ))}
    </div>
  );
}
