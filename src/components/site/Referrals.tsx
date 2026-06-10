import Link from "next/link";

export default function Referrals() {
  return (
    <section id="referidos" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand to-brand-bright px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold text-ink/60">Plan de referidos</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Tu red te paga
            </h2>
            <p className="mt-4 max-w-md text-ink/70">
              Cada vez que compartís tu link o código QR y alguien se suma con su
              pago, te pagamos un monto fijo directo a la tarjeta con la que te
              registraste. Así de simple.
            </p>
            <Link
              href="/registro"
              className="mt-7 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Empezar a referir
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { k: "Compartís", v: "Link, WhatsApp o QR", icon: "🔗" },
              { k: "Se suma", v: "Tu referido paga", icon: "🤝" },
              { k: "Cobrás", v: "Directo a tu tarjeta", icon: "💳" },
            ].map((c) => (
              <div
                key={c.k}
                className="rounded-2xl bg-white/70 p-5 text-center backdrop-blur"
              >
                <div className="text-2xl">{c.icon}</div>
                <p className="mt-2 font-display text-sm font-bold text-ink">
                  {c.k}
                </p>
                <p className="text-xs text-ink/60">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
