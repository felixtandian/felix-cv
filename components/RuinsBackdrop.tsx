import Sprite from "./Sprite";

/*
 * Fixed full-page backdrop: stone ruins flank the sides, the sky stays
 * open in the middle, and a 90s day cycle passes overhead (sun → sunset →
 * midnight → dawn). Dim silhouettes only so content stays readable;
 * "." holes double as broken windows. Sun and moon render behind the
 * ruins so they set behind them; the sky tint lies over everything.
 */

const tower = [
  ".x..x...x...",
  ".xx.xx..xx..",
  ".xxxxxx.xx..",
  ".xxxxxxxxx..",
  ".xxxxxxxxxx.",
  ".xxxxxxxxxx.",
  ".xx..xxxxxx.",
  ".xx..xxxxxx.",
  ".xxxxxxxxxx.",
  ".xxxx..xxxx.",
  ".xxxx..xxxx.",
  ".xxxxxxxxxx.",
  ".xxxxxxxxxx.",
  ".xx..xxxxxx.",
  ".xx..xxxxxx.",
  ".xxxxxxxxxx.",
  ".xxxxxxxxxx.",
  ".xxxx..xxxx.",
  ".xxxx..xxxx.",
  ".xxxxxxxxxx.",
  ".xxxxxxxxxx.",
  "xxxxxxxxxxxx",
];

const gateWall = [
  "xxx..xxxx...xxx...xx....",
  "xxxx.xxxxx..xxxx..xxx...",
  "xxxxxxxxxxxxxxxxxxxxx...",
  "xxxxxxxxxxxxxxxxxxxxxx..",
  "xxxxxxxx......xxxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
  "xxxxxxx........xxxxxxx..",
];

const keep = [
  ".x.x.x..............",
  ".xxxxx..............",
  ".xxxxx.......x.x....",
  ".xxxxx......xxxxx...",
  ".xxxxxx.....xxxxx...",
  ".xxxxxxx...xxxxxx...",
  ".xxxxxxxxxxxxxxxx...",
  ".xxxxxxxxxxxxxxxxx..",
  ".xxx..xxxxxxx..xxx..",
  ".xxx..xxxxxxx..xxx..",
  ".xxxxxxxxxxxxxxxxx..",
  ".xxxxxxxxxxxxxxxxx..",
  ".xxxxxx...xxxxxxxx..",
  ".xxxxxx...xxxxxxxx..",
  ".xxxxxxxxxxxxxxxxx..",
  "xxxxxxxxxxxxxxxxxxx.",
  "xxxxxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxxxxx",
];

const spire = [
  "...x....",
  "..xx....",
  "..xxx...",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  "..xxxx..",
  ".xxxxxx.",
  "xxxxxxxx",
];

/* clustered at the edges — the middle stays open sky */
const CITY: { rows: string[]; left: string; px: number; color: string }[] = [
  { rows: keep, left: "1%", px: 7, color: "#8a8168" },
  { rows: tower, left: "11%", px: 6, color: "#7c755d" },
  { rows: spire, left: "16%", px: 6, color: "#958c70" },
  { rows: spire, left: "81%", px: 6, color: "#7c755d" },
  { rows: gateWall, left: "85%", px: 7, color: "#958c70" },
  { rows: tower, left: "95%", px: 6, color: "#8a8168" },
];

export default function RuinsBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(#6f9ec2, #aac6d6 55%, #e6d9ae)",
      }}
    >
      <span className="sun absolute" />
      <span className="moon absolute" />
      {CITY.map((b, i) => (
        <div key={i} className="absolute bottom-0" style={{ left: b.left }}>
          <Sprite rows={b.rows} palette={{ x: b.color }} px={b.px} />
        </div>
      ))}
      <div className="sky-cycle absolute inset-0" />
    </div>
  );
}
