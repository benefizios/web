import Link from "next/link";
import AppMockups from "@/components/site/AppMockups";
import Brand from "@/components/Brand";

export default function HeroBold() {
  return (
    <section className="relative overflow-hidden bg-brand">
      <div className="noise opacity-[0.06]" />
      {/* halo más claro detrás de los teléfonos */}
      <div className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-brand-bright blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="text-center lg:text-left">
          <span
            className="rise-in inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand"
            style={{ animationDelay: "0ms" }}
          >
            ★ Tu decisión inteligente
          </span>

          <h1
            className="rise-in mt-6 font-display text-[3.4rem] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[5.2rem]"
            style={{ animationDelay: "80ms" }}
          >
            Ahorra en
            <br />
            lo de todos
            <br />
            los días.
          </h1>

          <p
            className="rise-in mx-auto mt-7 max-w-md text-lg font-medium text-ink/75 lg:mx-0"
            style={{ animationDelay: "160ms" }}
          >
            Una sola membresía y desbloqueas <Brand /> reales en cientos de
            comercios cerca de ti. Sin compras online, fáciles de redimir.
          </p>

          <div
            className="rise-in mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/registro"
              className="w-full rounded-full bg-ink px-8 py-4 text-center text-base font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
            >
              Quiero mi membresía
            </Link>
            <a
              href="#como-funciona"
              className="w-full rounded-full border-2 border-ink px-8 py-4 text-center text-base font-bold text-ink transition-[transform,background-color] duration-200 ease-snappy hover:bg-ink hover:text-brand active:scale-[0.98] sm:w-auto"
            >
              Ver cómo funciona
            </a>
          </div>

          <div
            className="rise-in mt-8 flex items-center justify-center gap-6 text-sm font-semibold text-ink/70 lg:justify-start"
            style={{ animationDelay: "320ms" }}
          >
            <span>✓ Gratis para los negocios</span>
            <span>✓ Ganas por referir</span>
          </div>
        </div>

        <div className="rise-scale relative" style={{ animationDelay: "220ms" }}>
          <AppMockups />
        </div>
      </div>
    </section>
  );
}
