import { seededRandom } from "./codeUtils";

export default function Barcode({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const rand = seededRandom(value);
  const bars: React.ReactNode[] = [];
  let x = 0;
  let i = 0;
  while (x < 100 && i < 80) {
    const w = 0.6 + rand() * 2.4;
    if (i % 2 === 0) {
      bars.push(<rect key={i} x={x} y={0} width={w} height={30} />);
    }
    x += w;
    i++;
  }
  return (
    <svg
      viewBox={`0 0 ${x} 30`}
      preserveAspectRatio="none"
      className={className}
      fill="#232323"
      role="img"
      aria-label="Código de barras"
    >
      {bars}
    </svg>
  );
}
