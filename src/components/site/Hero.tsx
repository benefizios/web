import Link from "next/link";
import AppMockups from "./AppMockups";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* glow de marca */}
      <div className="pointer-events-none absolute inset-x-0 -top-32 h-[640px]">
        <div className="brand-glow absolute inset-0" />
        <div className="noise" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-2 lg:gap-6 lg:pb-24 lg:pt-20">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-xs font-semibold text-ink/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Tu decisión inteligente
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Descuentos que{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">valen</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-3 -rotate-1 bg-brand/60" />
            </span>{" "}
            tu membresía
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base text-ink/60 sm:text-lg lg:mx-0">
            Una sola membresía y accedes a benefizios de uso cotidiano:
            estacionamiento, restaurantes, café, entretenimiento y más. Sin
            compras online, fáciles de redimir.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/registro"
              className="w-full rounded-full bg-ink px-7 py-3.5 text-center text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Quiero mi membresía
            </Link>
            <a
              href="#como-funciona"
              className="w-full rounded-full border border-ink/15 bg-white/60 px-7 py-3.5 text-center text-sm font-semibold text-ink backdrop-blur transition-colors hover:bg-white sm:w-auto"
            >
              Ver cómo funciona
            </a>
          </div>

          <div className="mt-7 flex items-center justify-center gap-6 text-xs text-ink/50 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <span className="text-brand">✓</span> Sin costo para los negocios
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand">✓</span> Ganas por referir
            </span>
          </div>
        </div>

        <div className="relative">
          <AppMockups />
        </div>
      </div>
    </section>
  );
}
