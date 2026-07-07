/* renders a text-grid pixel sprite as crisp SVG rects; "." is transparent */
export default function Sprite({
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
