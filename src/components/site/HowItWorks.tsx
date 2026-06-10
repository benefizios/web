const steps = [
  {
    n: "01",
    title: "Activá tu membresía",
    desc: "Te registrás y pagás tu membresía mensual con tarjeta. Cobros recurrentes seguros (PCI DSS).",
  },
  {
    n: "02",
    title: "Explorá los beneficios",
    desc: "Con la membresía activa se desbloquean todos los descuentos disponibles cerca tuyo.",
  },
  {
    n: "03",
    title: "Redimí en el local",
    desc: "Mostrás el cupón con QR, código de barras o texto. La hora en vivo evita capturas de pantalla.",
  },
  {
    n: "04",
    title: "Invitá y ganá",
    desc: "Compartí tu link o código QR. Por cada referido que se suma, cobrás directo a tu tarjeta.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-ink py-16 text-white lg:py-24"
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Cómo funciona</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            De registrarte a ahorrar, en cuatro pasos
          </h2>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="font-display text-4xl font-extrabold text-brand">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
