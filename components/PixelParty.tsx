"use client";

import { useEffect, useState } from "react";
import Sprite from "./Sprite";

/*
 * Patrol diorama pinned to the viewport bottom, set in ancient ruins.
 * The party marches back and forth across the screen; occasionally a
 * monster gives chase for a leg and everyone runs. Click a party member
 * to turn and cast — one landed hit fells the chaser (the priest heals).
 *
 * Sprites are text grids — each char is a palette key, "." transparent.
 * Party sprites face RIGHT, enemies face LEFT; the whole formation is
 * flipped when marching left so sprites always face the direction of
 * travel (the dragon is drawn facing right and gets the opposite mirror).
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

/* flight order: knight guards the rear, nearest the chaser */
const PARTY = [knight, archer, mage, priest];

/* ---------- enemies (drawn facing LEFT, toward the party) ---------- */

type Enemy = {
  name: string;
  palette: Record<string, string>;
  frames: { a: string[]; b: string[] };
  px?: number;
  fly?: boolean;
  facesRight?: boolean; // drawn facing right — skip the chase mirror
};

const slime: Enemy = {
  name: "slime",
  palette: { g: "#3fa5a0", G: "#2b7b77", e: "#1a1512" },
  frames: {
    a: [
      "...gggg...",
      "..gggggg..",
      ".gggggggg.",
      ".gegggegg.",
      ".gggggggg.",
      ".GGGGGGGG.",
    ],
    b: [
      "..........",
      "..gggggg..",
      ".gggggggg.",
      "ggegggeggg",
      "gggggggggg",
      "GGGGGGGGGG",
    ],
  },
};

const goblin: Enemy = {
  name: "goblin",
  palette: { n: "#4a7c36", d: "#4a3b2a", e: "#c0392b", w: "#cfd6dd" },
  frames: {
    a: [
      "....nnnn....",
      "...nnnnnn...",
      "...ennnnn...",
      "...nnnnnn...",
      "....dddd....",
      "...dddddd...",
      ".w.dddddd...",
      "..ndddddd...",
      "....dddd....",
      "...nn..nn...",
      "...nn..nn...",
      "..nnn..nnn..",
    ],
    b: [
      "....nnnn....",
      "...nnnnnn...",
      "...ennnnn...",
      "...nnnnnn...",
      "....dddd....",
      "...dddddd...",
      ".w.dddddd...",
      "..ndddddd...",
      "....dddd....",
      "....nn.nn...",
      "....nn.nn...",
      "...nnn.nnn..",
    ],
  },
};

const bat: Enemy = {
  name: "bat",
  palette: { p: "#7e57c2", e: "#f5d67b" },
  fly: true,
  frames: {
    a: [
      ".pp......pp.",
      ".ppp....ppp.",
      "..pppppppp..",
      "..peppppep..",
      "..pppppppp..",
      "...p.pp.p...",
      "............",
    ],
    b: [
      "............",
      "..p......p..",
      ".pppppppppp.",
      "..peppppep..",
      "..pppppppp..",
      "...p.pp.p...",
      "............",
    ],
  },
};

const skeleton: Enemy = {
  name: "skeleton",
  palette: { k: "#d8d3c3", e: "#1a1512", d: "#4a4438", w: "#cfd6dd" },
  frames: {
    a: [
      "....kkkk....",
      "...kkkkkk...",
      "...ekkkke...",
      "...kkkkkk...",
      "....kkkk....",
      "...kkkkkk...",
      ".w.kkkkkk...",
      ".wkkdkkdkk..",
      "...kdkkdk...",
      "....kkkk....",
      "...kk..kk...",
      "...kk..kk...",
      "..kkk..kkk..",
    ],
    b: [
      "....kkkk....",
      "...kkkkkk...",
      "...ekkkke...",
      "...kkkkkk...",
      "....kkkk....",
      "...kkkkkk...",
      ".w.kkkkkk...",
      ".wkkdkkdkk..",
      "...kdkkdk...",
      "....kkkk....",
      "....kk.kk...",
      "....kk.kk...",
      "...kkk.kkk..",
    ],
  },
};

/* rare boss — already drawn facing right, so it needs no chase mirror */
const dragon: Enemy = {
  name: "dragon",
  palette: { r: "#8a2323", R: "#c94f4f", w: "#5c1616", e: "#f5d67b" },
  px: 5,
  fly: true,
  facesRight: true,
  frames: {
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
  },
};

const ENEMIES = [slime, goblin, bat, skeleton];

/* ---------- ruins backdrop (silhouettes behind the fighters) ---------- */

const ruinPalette = { p: "#c2ae76" };

const brokenColumn = [
  "..p.p...",
  "..ppp...",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  "..pppp..",
  ".pppppp.",
  "pppppppp",
];

const stump = [
  ".p.pp...",
  ".pppp...",
  ".ppppp..",
  ".ppppp..",
  ".ppppp..",
  "pppppppp",
  "pppppppp",
];

const arch = [
  "pppppppppp....pp..",
  "pppppppppppp..ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  ".ppp..........ppp.",
  "pppp..........pppp",
  "pppp..........pppp",
];

const RUINS: { rows: string[]; left: string }[] = [
  { rows: brokenColumn, left: "4%" },
  { rows: arch, left: "22%" },
  { rows: stump, left: "43%" },
  { rows: brokenColumn, left: "58%" },
  { rows: stump, left: "74%" },
  { rows: arch, left: "88%" },
];

// sanity check the hand-drawn grids in dev — a bad row silently shifts the sprite
if (process.env.NODE_ENV !== "production") {
  const check = (name: string, rows: string[]) =>
    console.assert(
      rows.every((r) => r.length === rows[0].length),
      `bad sprite grid: ${name}`
    );
  for (const c of PARTY)
    for (const [key, rows] of Object.entries(c.frames)) check(`${c.name}.${key}`, rows);
  for (const e of [...ENEMIES, dragon])
    for (const [key, rows] of Object.entries(e.frames)) check(`${e.name}.${key}`, rows);
  check("brokenColumn", brokenColumn);
  check("stump", stump);
  check("arch", arch);
}

function Adventurer({
  c,
  frame,
  casting,
  castId,
  onCast,
}: {
  c: Character;
  frame: number;
  casting: boolean;
  castId: number;
  onCast: () => void;
}) {
  const rows = casting ? c.frames.cast : frame ? c.frames.b : c.frames.a;
  // attackers turn back toward the chaser to cast; the heal stays forward
  const turned = casting && c.fx !== "heal";
  return (
    <div
      className="char-hop pointer-events-auto relative cursor-pointer"
      onClick={onCast}
      title={c.name}
    >
      <div
        className="relative"
        style={turned ? { transform: "scaleX(-1)" } : undefined}
      >
        <Sprite rows={rows} palette={c.palette} />
        {casting && <span key={castId} className={`fx fx-${c.fx}`} />}
      </div>
    </div>
  );
}

export default function PixelParty() {
  const [frame, setFrame] = useState(0);
  const [heading, setHeading] = useState(1); // 1 = marching right, -1 = left
  const [chaser, setChaser] = useState<Enemy | null>(null);
  const [dead, setDead] = useState(false);
  const [casterIdx, setCasterIdx] = useState(-1);
  const [castId, setCastId] = useState(0);

  // shared 2-frame cycle: marching legs, wing flaps, slime squish —
  // everyone hustles when a monster is on their heels
  useEffect(() => {
    const iv = setInterval(() => setFrame((f) => f ^ 1), chaser ? 150 : 280);
    return () => clearInterval(iv);
  }, [chaser]);

  // one cast: turn, pose + effect; an offensive hit fells the chaser
  const castAs = (idx: number) => {
    setCasterIdx(idx);
    setCastId((i) => i + 1);
    setTimeout(() => setCasterIdx((cur) => (cur === idx ? -1 : cur)), 900);
    if (PARTY[idx].fx !== "heal") setTimeout(() => setDead(true), 450);
  };

  // at each edge: turn around, and occasionally a monster gives chase
  // (never the same one twice in a row; the dragon is the rare boss)
  const nextLeg = () => {
    setHeading((h) => -h);
    setDead(false);
    setChaser((cur) => {
      if (Math.random() >= 0.3) return null; // calm patrol leg
      if (cur !== dragon && Math.random() < 0.12) return dragon;
      const pool = ENEMIES.filter((e) => e !== cur);
      return pool[Math.floor(Math.random() * pool.length)];
    });
  };

  return (
    <div
      aria-hidden
      className="pixel-party pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24 overflow-hidden"
    >
      {/* crumbled ruins on the horizon */}
      {RUINS.map((r, i) => (
        <div key={i} className="absolute bottom-0" style={{ left: r.left }}>
          <Sprite rows={r.rows} palette={ruinPalette} />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-px bg-gold/20" />

      {/* one leg per crossing; a chase leg runs the same path, just faster.
          Flipping the inner group turns the whole formation around, monster
          included, so every sprite faces the direction of travel. */}
      <div
        className={`absolute bottom-0 left-0 flex items-end will-change-transform ${
          heading > 0 ? "leg-right" : "leg-left"
        }`}
        style={{ animationDuration: chaser ? "13s" : "34s" }}
        onAnimationEnd={(e) => {
          if (e.animationName === "leg-right" || e.animationName === "leg-left")
            nextLeg();
        }}
      >
        <div
          className="relative"
          style={heading < 0 ? { transform: "scaleX(-1)" } : undefined}
        >
          <div className="flex items-end gap-2">
            {PARTY.map((c, i) => (
              <Adventurer
                key={c.name}
                c={c}
                frame={frame}
                casting={i === casterIdx}
                castId={castId}
                onCast={() => castAs(i)}
              />
            ))}
          </div>

          {/* monster at their heels — outside the flex flow so calm legs
              keep the same formation; a felled one stays down for the leg */}
          {chaser && (
            <div
              className={`absolute bottom-0 ${dead ? "enemy-die" : ""}`}
              style={{ right: "calc(100% + 28px)" }}
            >
              <div
                className={chaser.fly ? "fly-bob relative mb-5" : "relative"}
              >
                <div
                  style={
                    chaser.facesRight ? undefined : { transform: "scaleX(-1)" }
                  }
                >
                  <Sprite
                    rows={frame ? chaser.frames.b : chaser.frames.a}
                    palette={chaser.palette}
                    px={chaser.px ?? 4}
                  />
                </div>
                {chaser.name === "dragon" && !dead && (
                  <span className="fx fx-fire" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
