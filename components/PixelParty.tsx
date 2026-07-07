"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Pixel sprites drawn as text grids — each char is a palette key,
 * "." is transparent. Party frames: a/b = walk cycle, cast = skill pose.
 * All sprites face RIGHT; walking left is a scaleX(-1) mirror.
 */

type Frames = { a: string[]; b: string[]; cast: string[] };
type Character = {
  name: string;
  palette: Record<string, string>;
  frames: Frames;
  fx: "slash" | "arrow" | "orb" | "heal";
};

const knight: Character = {
  name: "knight",
  palette: { m: "#b8c0cc", d: "#5f6672", r: "#c0392b", g: "#d4af37", v: "#e6ecf4" },
  fx: "slash",
  frames: {
    a: [
      ".....rr.....",
      "....mmmm....",
      "...mmmmmm...",
      "...mddddm...",
      "...mmmmmm...",
      "....gggg....",
      "...mmmmmm...",
      "..mmmmmmmm..",
      "..dd.mm.dd..",
      "..d.mmmm.d..",
      "....dddd....",
      "...dd..dd...",
      "...dd..dd...",
      "..ddd..ddd..",
    ],
    b: [
      ".....rr.....",
      "....mmmm....",
      "...mmmmmm...",
      "...mddddm...",
      "...mmmmmm...",
      "....gggg....",
      "...mmmmmm...",
      "..mmmmmmmm..",
      "..dd.mm.dd..",
      "..d.mmmm.d..",
      "....dddd....",
      "....dd.dd...",
      "....dd.dd...",
      "...ddd.ddd..",
    ],
    cast: [
      ".....rr..v..",
      "....mmmm.v..",
      "...mmmmmmv..",
      "...mddddmv..",
      "...mmmmmmd..",
      "....gggg....",
      "...mmmmmm...",
      "..mmmmmmmm..",
      "..dd.mm.....",
      "..d.mmmm....",
      "....dddd....",
      "...dd..dd...",
      "...dd..dd...",
      "..ddd..ddd..",
    ],
  },
};

const archer: Character = {
  name: "archer",
  palette: {
    b: "#3e8948",
    s: "#e8b88a",
    e: "#2b2118",
    w: "#8a5a2b",
    g: "#d4af37",
    d: "#4a3b2a",
    a: "#e8e2d0",
  },
  fx: "arrow",
  frames: {
    a: [
      "............",
      "....bbbb....",
      "...bbbbbb...",
      "...bssssb...",
      "...bseesb...",
      "....ssss....",
      "...bbbbbb.w.",
      "..bbbbbbb.w.",
      "..sbbbbbbsw.",
      "...bbbbbb.w.",
      "....gggg..w.",
      "...dd..dd...",
      "...dd..dd...",
      "..ddd..ddd..",
    ],
    b: [
      "............",
      "....bbbb....",
      "...bbbbbb...",
      "...bssssb...",
      "...bseesb...",
      "....ssss....",
      "...bbbbbb.w.",
      "..bbbbbbb.w.",
      "..sbbbbbbsw.",
      "...bbbbbb.w.",
      "....gggg..w.",
      "....dd.dd...",
      "....dd.dd...",
      "...ddd.ddd..",
    ],
    cast: [
      "............",
      "....bbbb....",
      "...bbbbbb...",
      "...bssssb...",
      "...bseesb...",
      "....ssss....",
      "...bbbbbb.w.",
      "..bbbbbbb.w.",
      ".sbbbbbbsaw.",
      "...bbbbbb.w.",
      "....gggg..w.",
      "...dd..dd...",
      "...dd..dd...",
      "..ddd..ddd..",
    ],
  },
};

const mage: Character = {
  name: "mage",
  palette: {
    b: "#6248c9",
    s: "#e8b88a",
    e: "#2b2118",
    w: "#8a5a2b",
    o: "#7df9ff",
  },
  fx: "orb",
  frames: {
    a: [
      ".....bb.....",
      "....bbbb....",
      "..bbbbbbbb..",
      "....ssss....",
      "....sees....",
      "...bbbbbb.o.",
      "...bbbbbb.w.",
      "..sbbbbbbsw.",
      "...bbbbbb.w.",
      "...bbbbbb.w.",
      "...bbbbbb.w.",
      "..bbbbbbbb..",
      "..bbbbbbbb..",
      "...e....e...",
    ],
    b: [
      ".....bb.....",
      "....bbbb....",
      "..bbbbbbbb..",
      "....ssss....",
      "....sees....",
      "...bbbbbb.o.",
      "...bbbbbb.w.",
      "..sbbbbbbsw.",
      "...bbbbbb.w.",
      "...bbbbbb.w.",
      "...bbbbbb.w.",
      "..bbbbbbbb..",
      ".bbbbbbbbb..",
      "....e..e....",
    ],
    cast: [
      ".....bb.....",
      "....bbbb....",
      "..bbbbbbbb..",
      "....ssss..o.",
      "....sees..w.",
      "...bbbbbb.w.",
      "...bbbbbb.w.",
      "...bbbbbbsw.",
      "...bbbbbb.w.",
      "...bbbbbb...",
      "...bbbbbb...",
      "..bbbbbbbb..",
      "..bbbbbbbb..",
      "...e....e...",
    ],
  },
};

const priest: Character = {
  name: "priest",
  palette: {
    b: "#f0e9d8",
    t: "#d4af37",
    s: "#e8b88a",
    e: "#2b2118",
    h: "#6b4a2f",
  },
  fx: "heal",
  frames: {
    a: [
      "....hhhh....",
      "...hssssh...",
      "...hseesh...",
      "....ssss....",
      "...bbbbbb...",
      "...bbttbb...",
      "...bttttb...",
      "...bbttbb...",
      "..sbbbbbbs..",
      "...bbbbbb...",
      "...bbbbbb...",
      "..bbbbbbbb..",
      "..bbbbbbbb..",
      "...e....e...",
    ],
    b: [
      "....hhhh....",
      "...hssssh...",
      "...hseesh...",
      "....ssss....",
      "...bbbbbb...",
      "...bbttbb...",
      "...bttttb...",
      "...bbttbb...",
      "..sbbbbbbs..",
      "...bbbbbb...",
      "...bbbbbb...",
      "..bbbbbbbb..",
      ".bbbbbbbbb..",
      "....e..e....",
    ],
    cast: [
      "....hhhh....",
      "...hssssh...",
      "...hseesh...",
      "....ssss....",
      ".s.bbbbbb.s.",
      "...bbttbb...",
      "...bttttb...",
      "...bbttbb...",
      "...bbbbbb...",
      "...bbbbbb...",
      "...bbbbbb...",
      "..bbbbbbbb..",
      "..bbbbbbbb..",
      "...e....e...",
    ],
  },
};

/* the party marches in this order; knight leads the way right */
const PARTY = [priest, mage, archer, knight];

const dragonPalette = {
  r: "#8a2323",
  R: "#c94f4f",
  w: "#5c1616",
  e: "#f5d67b",
};

const dragonFrames = {
  a: [
    ".....ww...........",
    "....wwww..........",
    "...wwwwww...rrrrr.",
    "..rrwwwww...rrrer.",
    ".rrrrrrrrrrrrrrrr.",
    ".rRRRRRRRRRRRrrr..",
    "..rRRRRRRRRRr.....",
    "...rr...rr........",
    "...rr...rr........",
    "..................",
  ],
  b: [
    "..................",
    "....wwww..........",
    "...wwwwww...rrrrr.",
    "..rrwwwww...rrrer.",
    ".rrrrrrrrrrrrrrrr.",
    ".rRRRRRRRRRRRrrr..",
    "..rRRRRRRRRRr.....",
    "...rr...rr........",
    "...rr...rr........",
    "..................",
  ],
};

// sanity check the hand-drawn grids in dev — a bad row silently shifts the sprite
if (process.env.NODE_ENV !== "production") {
  const check = (name: string, rows: string[], w: number) =>
    console.assert(
      rows.every((r) => r.length === w),
      `bad sprite grid: ${name}`
    );
  for (const c of PARTY)
    for (const [key, rows] of Object.entries(c.frames)) check(`${c.name}.${key}`, rows, 12);
  check("dragon.a", dragonFrames.a, 18);
  check("dragon.b", dragonFrames.b, 18);
}

function Sprite({
  rows,
  palette,
  px = 4,
}: {
  rows: string[];
  palette: Record<string, string>;
  px?: number;
}) {
  return (
    <svg
      width={rows[0].length * px}
      height={rows.length * px}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "." ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * px}
              y={y * px}
              width={px}
              height={px}
              fill={palette[ch]}
            />
          )
        )
      )}
    </svg>
  );
}

function Adventurer({
  c,
  frame,
  canCast,
}: {
  c: Character;
  frame: number;
  canCast: boolean;
}) {
  const [casting, setCasting] = useState(false);
  const [castId, setCastId] = useState(0);

  useEffect(() => {
    if (!canCast) {
      setCasting(false);
      return;
    }
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const scheduleCast = () => {
      timer = setTimeout(() => {
        if (stopped) return;
        setCasting(true);
        setCastId((i) => i + 1);
        setTimeout(() => !stopped && setCasting(false), 900);
        scheduleCast();
      }, 4000 + Math.random() * 6000);
    };
    scheduleCast();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, [canCast]);

  const rows = casting ? c.frames.cast : frame ? c.frames.b : c.frames.a;

  return (
    <div className="relative">
      <Sprite rows={rows} palette={c.palette} />
      {casting && <span key={castId} className={`fx fx-${c.fx}`} />}
    </div>
  );
}

export default function PixelParty() {
  const [mode, setMode] = useState<"patrol" | "chase">("patrol");
  const [facing, setFacing] = useState<1 | -1>(1); // 1 = walking right
  const [frame, setFrame] = useState(0);
  const patrolRef = useRef<HTMLDivElement>(null);

  // shared walk cycle so the party marches in step; they sprint when chased
  useEffect(() => {
    const iv = setInterval(() => setFrame((f) => f ^ 1), mode === "chase" ? 140 : 280);
    return () => clearInterval(iv);
  }, [mode]);

  // the patrol animation alternates; each finished leg = turn around
  useEffect(() => {
    const el = patrolRef.current;
    if (!el) return;
    const onIteration = (e: AnimationEvent) => {
      if (e.animationName === "patrol") setFacing((f) => (f === 1 ? -1 : 1));
    };
    el.addEventListener("animationiteration", onIteration);
    return () => el.removeEventListener("animationiteration", onIteration);
  }, [mode]);

  // rare event: a dragon shows up and the party legs it across the screen
  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const scheduleChase = () => {
      timer = setTimeout(() => {
        if (stopped) return;
        setMode("chase");
        setTimeout(() => {
          if (stopped) return;
          setFacing(1);
          setMode("patrol");
          scheduleChase();
        }, 8000);
      }, 30000 + Math.random() * 45000);
    };
    scheduleChase();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pixel-party pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24 overflow-hidden"
    >
      {mode === "patrol" ? (
        <div ref={patrolRef} className="party-patrol">
          {/* mirror the whole row when walking left: order + facing flip together */}
          <div
            className="flex items-end gap-2"
            style={{ transform: `scaleX(${facing})` }}
          >
            {PARTY.map((c) => (
              <Adventurer key={c.name} c={c} frame={frame} canCast />
            ))}
          </div>
        </div>
      ) : (
        <div className="party-chase">
          <div className="flex items-end gap-6">
            <div className="dragon-fly relative mb-6">
              <Sprite rows={frame ? dragonFrames.b : dragonFrames.a} palette={dragonPalette} px={5} />
              <span className="fx fx-fire" />
            </div>
            <div className="flex items-end gap-2">
              {PARTY.map((c) => (
                <Adventurer key={c.name} c={c} frame={frame} canCast={false} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
