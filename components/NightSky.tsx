import Sprite from "./Sprite";

/*
 * Fixed full-page backdrop: a crowded JRPG night sky. Back to front:
 * nebulae, three star layers + sparkles, a ringed planet, the moon,
 * drifting clouds, meteors, a hot-air balloon and bat flock going the
 * other way, the airship, and a stepped mountain horizon at the bottom.
 */

const airship = [
  "..bbbbbbbb..",
  ".bbbbbbbbbb.",
  "bbbbbbbbbbbb",
  ".bbbbbbbbbb.",
  "..bbbbbbbb..",
  ".....hh.....",
  "..hhhhhhhh..",
  ".hwhhwhhwhh.",
  "..hhhhhhhh..",
];

const planet = [
  ".....pppp.....",
  "....pppppp....",
  "...pddppppp...",
  "rr.pppppppp.rr",
  ".rrrrrrrrrrrr.",
  "....pppppp....",
  ".....pppp.....",
];

const balloon = [
  ".ccccc.",
  "cscscsc",
  "cscscsc",
  ".ccccc.",
  ".r...r.",
  "..hhh..",
];

const bat = ["w.w", "www"];

/* stepped silhouettes, stretched full-width (crisp steps survive scaling) */
const BACK_RANGE =
  "0,28 0,14 5,14 5,10 9,10 9,7 13,7 13,11 19,11 19,15 26,15 26,11 31,11 31,6 35,6 35,3 39,3 39,9 46,9 46,14 54,14 54,11 60,11 60,7 64,7 64,4 68,4 68,10 74,10 74,14 80,14 80,8 86,8 86,5 90,5 90,10 95,10 95,13 100,13 100,28";
const FRONT_RANGE =
  "0,18 0,9 6,9 6,6 11,6 11,12 18,12 18,8 25,8 25,5 30,5 30,11 38,11 38,14 47,14 47,9 55,9 55,6 61,6 61,12 70,12 70,7 77,7 77,10 85,10 85,6 91,6 91,11 100,11 100,18";

export default function NightSky() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "linear-gradient(#0b1030, #121a44 60%, #1b2560)" }}
    >
      <span className="nebula-a absolute" />
      <span className="nebula-b absolute" />
      <span className="stars-xs absolute" />
      <span className="stars-sm absolute" />
      <span className="stars-lg absolute" />
      <span className="sparkle-a absolute" />
      <span className="sparkle-b absolute" />
      <span className="sparkle-c absolute" />
      <div className="absolute" style={{ top: "20vh", left: "7vw" }}>
        <Sprite
          rows={planet}
          palette={{ p: "#c9a05a", d: "#a5804a", r: "#9aa6d0" }}
          px={3}
        />
      </div>
      <span className="moon absolute" />
      <span className="cloud-a absolute" />
      <span className="cloud-b absolute" />
      <span className="cloud-c absolute" />
      <span className="meteor-a absolute" />
      <span className="meteor-b absolute" />
      <span className="meteor-c absolute" />
      <div className="balloon-fly absolute">
        <div className="balloon-bob">
          <Sprite
            rows={balloon}
            palette={{ c: "#a45a6b", s: "#e8d5a0", r: "#8a7a5a", h: "#6b4a2b" }}
            px={2}
          />
        </div>
      </div>
      <div className="bat-flock absolute">
        {[0, 1, 2, 3, 4].map((i) => (
          <Sprite key={i} rows={bat} palette={{ w: "#2b3568" }} px={2} />
        ))}
      </div>
      <div className="airship-fly absolute">
        <div className="airship-bob relative">
          <Sprite
            rows={airship}
            palette={{ b: "#2e3a75", h: "#1f2750", w: "#ffd54a" }}
            px={3}
          />
          <span className="airship-prop" />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <svg
          className="block w-full"
          height="96"
          viewBox="0 0 100 28"
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
        >
          <polygon points={BACK_RANGE} fill="#131b45" />
        </svg>
        <svg
          className="absolute inset-x-0 bottom-0 block w-full"
          height="60"
          viewBox="0 0 100 18"
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
        >
          <polygon points={FRONT_RANGE} fill="#0c1232" />
        </svg>
      </div>
    </div>
  );
}
