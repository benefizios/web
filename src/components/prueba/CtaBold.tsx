import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function CtaBold() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-center lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-3xl" />
      <Reveal className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-4xl font-extrabold leading-[1.0] tracking-tight text-white sm:text-6xl lg:text-7xl">
          Empieza a ahorrar
          <br />
          <span className="text-brand">esta semana</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
          Una membresía que se paga sola con el primer beneficio que usas.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/registro"
            className="w-full rounded-full bg-brand px-8 py-4 text-base font-bold text-ink transition-transform duration-200 ease-snappy hover:scale-[1.03] active:scale-[0.97] sm:w-auto"
          >
            Quiero mi membresía
          </Link>
          <Link
            href="/login"
            className="w-full rounded-full border-2 border-white/25 px-8 py-4 text-base font-bold text-white transition-colors duration-200 hover:bg-white/10 sm:w-auto"
          >
            Iniciar sesión
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
