import Link from "next/link";
import {
  siStarbucks,
  siMcdonalds,
  siBurgerking,
  siSpotify,
  siNetflix,
  siUbereats,
  siAdidas,
  siNike,
  siPuma,
} from "simple-icons";
import Reveal from "@/components/Reveal";
import Brand from "@/components/Brand";

type Icon = { path: string; title: string };

const benefits: { icon: Icon; desc: string }[] = [
  { icon: siStarbucks, desc: "$20 en consumos de +$250" },
  { icon: siMcdonalds, desc: "Combo a mitad de precio" },
  { icon: siSpotify, desc: "3 meses sin costo" },
  { icon: siNetflix, desc: "20% en tu plan" },
  { icon: siUbereats, desc: "30% en tu pedido" },
  { icon: siBurgerking, desc: "2x1 en Whopper" },
  { icon: siAdidas, desc: "25% en tienda" },
  { icon: siNike, desc: "20% en línea" },
  { icon: siPuma, desc: "30% en calzado" },
];

function BrandMark({ icon }: { icon: Icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0 fill-ink"
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}

export default function BenefitsLocked() {
  return (
    <section id="cerca" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold text-brand">Beneficios reales</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Cientos de marcas, cerca de ti
        </h2>
        <p className="mt-4 text-ink/60">
          Cada comercio elige su descuento y cómo redimirlo: código QR, de barras
          o texto. Se desbloquean con tu membresía activa.
        </p>
      </Reveal>

      <Reveal delay={80} className="relative mt-12">
        {/* Muro de beneficios, desactivado (difuminado) hasta tener membresía */}
        <div
          className="grid grid-cols-2 gap-3 blur-[5px] sm:grid-cols-3 sm:gap-4"
          aria-hidden
        >
          {benefits.map((b) => (
            <div
              key={b.icon.title}
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 opacity-70 grayscale sm:p-5"
            >
              <BrandMark icon={b.icon} />
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-bold text-ink">
                  {b.icon.title}
                </p>
                <p className="truncate text-xs text-ink/60">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Capa de bloqueo */}
        <div className="absolute inset-0 flex items-center justify-center bg-white/30">
          <div className="mx-5 max-w-sm rounded-3xl border border-black/5 bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-2xl shadow-sm">
              🔒
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">
              Solo para miembros
            </h3>
            <p className="mt-2 text-sm text-ink/60">
              Activa tu membresía <Brand /> e inicia sesión para ver todos los
              beneficios disponibles cerca de ti.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/registro"
                className="rounded-xl bg-ink py-3 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.02] active:scale-[0.98]"
              >
                Quiero mi membresía
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-haze py-3 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                Ya soy miembro
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 text-center text-xs text-ink/35">
        Marcas mostradas a modo de ejemplo.
      </p>
    </section>
  );
}
