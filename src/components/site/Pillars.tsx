import Brand from "@/components/Brand";

const pillars = [
  {
    icon: "🛍️",
    title: (
      <>
        <Brand /> de uso cotidiano
      </>
    ),
    desc: "Nada de promos que nunca usas. Descuentos en lo de todos los días: comer, estacionar, un café, salir.",
  },
  {
    icon: "⚡",
    title: "Fáciles de redimir",
    desc: "Muestras el cupón en el local con QR, código de barras o un texto. Sin compras online previas.",
  },
  {
    icon: "💸",
    title: "Ganas por referir",
    desc: "Comparte tu enlace o código QR. Cuando alguien se suma contigo, cobras directo a tu tarjeta.",
  },
];

export default function Pillars() {
  return (
    <section id="beneficios" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-brand">
          Por qué <Brand />
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Pensado para que la membresía{" "}
          <span className="text-ink/40">se pague sola</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="group rounded-3xl border border-black/5 bg-cream p-7 transition-shadow hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-2xl shadow-sm transition-transform group-hover:scale-110">
              {p.icon}
            </div>
            <h3 className="mt-5 font-display text-lg font-bold text-ink">
              {p.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
