import { seededRandom } from "./codeUtils";

const SIZE = 25;

function buildMatrix(seed: string): boolean[][] {
  const rand = seededRandom(seed);
  const m: boolean[][] = Array.from({ length: SIZE }, () =>
    Array(SIZE).fill(false),
  );

  // Patrón localizador (las 3 esquinas características de un QR)
  const finder = (r0: number, c0: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const edge = r === 0 || r === 6 || c === 0 || c === 6;
        const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        m[r0 + r][c0 + c] = edge || inner;
      }
    }
  };
  finder(0, 0);
  finder(0, SIZE - 7);
  finder(SIZE - 7, 0);

  const inFinder = (r: number, c: number) =>
    (r < 8 && c < 8) ||
    (r < 8 && c >= SIZE - 8) ||
    (r >= SIZE - 8 && c < 8);

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (inFinder(r, c)) continue;
      m[r][c] = rand() > 0.5;
    }
  }
  return m;
}

export default function QrCode({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const m = buildMatrix(value);
  const rects: React.ReactNode[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (m[r][c]) {
        rects.push(<rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} />);
      }
    }
  }
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className={className}
      shapeRendering="crispEdges"
      fill="#232323"
      role="img"
      aria-label="Código QR"
    >
      {rects}
    </svg>
  );
}
