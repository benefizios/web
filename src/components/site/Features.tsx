import Reveal from "@/components/Reveal";

const features = [
  {
    icon: "🏪",
    title: "Gratis para los negocios",
    desc: "Los comercios no pagan nada por participar. Solo ofrecen el descuento. Por eso hay cada vez más.",
  },
  {
    icon: "📲",
    title: "QR, código de barras o texto",
    desc: "Cada local elige cómo redimir. Códigos generados de forma dinámica o una simple descripción.",
  },
  {
    icon: "⏱️",
    title: "Hora en vivo anti-captura",
    desc: "Al redimir mostramos fecha y hora en tiempo real, para asegurar que no es una captura de pantalla.",
  },
  {
    icon: "🔒",
    title: "Pagos seguros (PCI DSS)",
    desc: "Encriptamos y almacenamos las tarjetas de forma segura, con cobros recurrentes confiables.",
  },
  {
    icon: "🎟️",
    title: "Sorteos y rifas",
    desc: "Además de descuentos, los miembros participan en sorteos y rifas exclusivas.",
  },
  {
    icon: "🔓",
    title: "Abierto a todos",
    desc: "Sin registro restringido. Cualquiera puede sumarse, activar su membresía y empezar a ahorrar.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-brand">
          Lo que nos hace distintos
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Con todo lo que necesitas
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 60} className="h-full">
            <div className="h-full rounded-2xl border border-black/5 bg-white p-6 transition-colors duration-300 hover:border-brand/40 hover:bg-cream">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-xl">
                {f.icon}
              </div>
              <h3 className="mt-4 font-display text-base font-bold text-ink">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                {f.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
