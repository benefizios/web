import Reveal from "@/components/Reveal";

// Logos de ejemplo (placeholders). Se reemplazan por marcas reales al lanzar.
const marcas = [
  "Cafético",
  "ParkUp",
  "CineLuna",
  "FitZone",
  "Sushiko",
  "Burgr",
  "SpaNube",
];

export default function LogoStrip() {
  return (
    <section className="border-y border-black/5 bg-white">
      <Reveal className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <p className="text-center text-sm font-semibold text-ink/50">
          Beneficios en comercios de todos los días{" "}
          <span className="text-ink/30">(ejemplos)</span>
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {marcas.map((m) => (
            <span
              key={m}
              className="font-display text-xl font-extrabold tracking-tight text-ink/35 transition-colors duration-200 hover:text-ink/70 sm:text-2xl"
            >
              {m}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
