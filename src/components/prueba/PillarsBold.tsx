import Brand from "@/components/Brand";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    title: (
      <>
        <Brand /> de uso cotidiano
      </>
    ),
    desc: "Nada de promos que nunca usas. Descuentos en lo de todos los días: comer, estacionar, un café, salir.",
  },
  {
    n: "02",
    title: "Fáciles de redimir",
    desc: "Muestras el código en el local (QR, barras o texto). Sin compras online, sin complicaciones.",
  },
  {
    n: "03",
    title: "Tu red te paga",
    desc: "Comparte tu enlace o código QR. Cuando alguien se suma contigo, cobras directo a tu tarjeta.",
  },
];

export default function PillarsBold() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <Reveal className="max-w-3xl">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          Pensado para que la membresía{" "}
          <span className="bg-brand px-2 leading-tight text-ink">
            se pague sola
          </span>
        </h2>
      </Reveal>

      <div className="mt-14 divide-y divide-black/10 border-t border-black/10">
        {pillars.map((p, i) => (
          <Reveal key={p.n} delay={i * 70}>
            <div className="grid items-baseline gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-10 lg:py-10">
              <span className="font-display text-6xl font-extrabold leading-none text-brand sm:text-7xl">
                {p.n}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-ink/65">
                  {p.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
