import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Brand from "@/components/Brand";
import Reveal from "@/components/Reveal";
import NegociosForm from "./NegociosForm";

export const metadata: Metadata = {
  title: "Suma tu negocio",
  description:
    "Da a conocer tu negocio y llega a miembros de Benefizios que ya buscan dónde gastar cerca de ti. Sumarte es gratis: tú eliges el descuento y solo aplica cuando hay venta.",
};

const ventajas = [
  {
    icon: "🆓",
    title: "Gratis, siempre",
    desc: "Sumarte y publicar tu beneficio no cuesta nada. No cobramos cuota, alta ni comisión por venta.",
  },
  {
    icon: "💸",
    title: "Si no vendes, no gastas",
    desc: "El único “costo” es el descuento, y solo aplica cuando alguien efectivamente compra. Cero ventas, cero gasto.",
  },
  {
    icon: "🧲",
    title: "Clientes nuevos",
    desc: "Te descubren miembros que ya están buscando dónde gastar cerca de ti, listos para pagar.",
  },
  {
    icon: "💳",
    title: "Mejor perfil de cliente",
    desc: "Quien usa Benefizios paga una membresía: busca lugares, no solo el cupón más barato.",
  },
  {
    icon: "🎛️",
    title: "Tú tienes el control",
    desc: "Tú defines el descuento, las sucursales y cómo se redime. Lo cambias o lo pausas cuando quieras.",
  },
  {
    icon: "📱",
    title: "Sin apps ni hardware",
    desc: "El cliente muestra un QR, código de barras o texto en tu local. No instalas nada.",
  },
];

const pasos = [
  {
    n: "01",
    title: "Cargas tu beneficio",
    desc: "Completas un formulario corto: tu negocio, el descuento y las sucursales donde aplica.",
  },
  {
    n: "02",
    title: "Lo revisamos y publicamos",
    desc: "Validamos los datos y lo dejamos visible para los miembros cercanos. Te avisamos por correo.",
  },
  {
    n: "03",
    title: "Un miembro lo usa",
    desc: "Llega a tu local y muestra el cupón con la hora en vivo, imposible de capturar en pantalla.",
  },
  {
    n: "04",
    title: "Validas y vendes",
    desc: "Confirmas el código y aplicas el descuento. Solo en ese momento “invertiste” en el cliente.",
  },
];

export default function NegociosPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-[760px]">
            <div className="brand-glow absolute inset-0" />
          </div>
          <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-14 text-center sm:px-8 lg:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-xs font-semibold text-ink/70 backdrop-blur">
              Para negocios
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Clientes nuevos que
              <br className="hidden sm:block" /> ya quieren comprar
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink/60">
              Miembros de <Brand /> buscan dónde gastar cerca de ti. Muéstrales
              tu negocio y date a conocer, <b className="text-ink/80">gratis</b>.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#registro"
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-transform duration-200 ease-snappy hover:scale-[1.03] active:scale-[0.97]"
              >
                Registrar mi negocio
              </a>
              <a
                href="#por-que"
                className="rounded-full border border-haze bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-mist"
              >
                ¿Por qué conviene?
              </a>
            </div>

            <p className="mt-5 text-xs text-ink/45">
              Sin cuota · Sin comisiones · Sin permanencia
            </p>
          </div>
        </section>

        {/* Por qué las cuponeras no funcionan */}
        <section id="por-que" className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-ink/55">El problema</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Por qué las cuponeras no funcionan
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Los esquemas de cupones tradicionales te piden el descuento por
              adelantado y se quedan con una comisión. Tú asumes todo el riesgo.
              En <Brand /> es al revés.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-black/5 bg-mist/50 p-7">
                <p className="font-display text-lg font-bold text-ink/70">
                  La cuponera tradicional
                </p>
                <ul className="mt-5 space-y-3 text-sm text-ink/60">
                  <li className="flex gap-3">
                    <span className="text-ink/40">✕</span>
                    Te exige un descuento grande para “entrar al catálogo”.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-ink/40">✕</span>
                    Se queda con una comisión de cada venta, vendas poco o mucho.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-ink/40">✕</span>
                    Atrae cazadores de ofertas que no vuelven a pagar precio
                    normal.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-ink/40">✕</span>
                    Si nadie compra, igual perdiste tiempo y margen.
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <div className="h-full rounded-3xl border border-brand/40 bg-[linear-gradient(160deg,#fff8df_0%,#ffe693_100%)] p-7">
                <p className="font-display text-lg font-bold text-ink">
                  <Brand />
                </p>
                <ul className="mt-5 space-y-3 text-sm text-ink/75">
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">✓</span>
                    Tú eliges el descuento. Pones lo que tiene sentido para ti.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">✓</span>
                    Cero comisiones: nunca te cobramos por una venta.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">✓</span>
                    Llegas a miembros que pagan por encontrar buenos lugares.
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-ink">✓</span>
                    Si no vendes, no gastas. El descuento solo existe si hay
                    compra.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl font-bold text-ink sm:text-2xl">
              Para ti es solo ganancia: clientes nuevos sin arriesgar nada.
            </p>
          </Reveal>
        </section>

        {/* Ventajas */}
        <section className="bg-ink py-16 text-white lg:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold text-brand">Ventajas</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Todo a favor del negocio
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {ventajas.map((v, i) => (
                <Reveal key={v.title} delay={i * 60}>
                  <div className="text-2xl">{v.icon}</div>
                  <h3 className="mt-3 font-display text-lg font-bold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {v.desc}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona para el negocio */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <Reveal className="max-w-2xl">
            <p className="text-sm font-semibold text-ink/55">Cómo funciona</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              De registrarte a vender, en cuatro pasos
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <span className="font-display text-4xl font-extrabold text-brand">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Registro */}
        <section
          id="registro"
          className="relative overflow-hidden bg-[linear-gradient(90deg,#ffe693_0%,#fff3cf_100%)] py-16 sm:py-20"
        >
          <div className="mx-auto max-w-2xl px-5 sm:px-8">
            <Reveal className="text-center">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Registra tu negocio
              </h2>
              <p className="mx-auto mt-3 max-w-md text-ink/65">
                Carga tu beneficio en minutos. Lo revisamos y lo publicamos.
                Gratis y sin compromiso.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-9 rounded-3xl border border-black/5 bg-white p-7 shadow-xl sm:p-9">
                <NegociosForm />
              </div>
            </Reveal>
            <p className="mt-5 text-center text-xs text-ink/55">
              ¿Ya sumaste tu negocio? Muy pronto podrás gestionar tus beneficios
              desde tu propia cuenta.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
