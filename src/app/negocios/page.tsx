import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Brand from "@/components/Brand";
import NegociosForm from "./NegociosForm";

export const metadata: Metadata = {
  title: "Suma tu negocio",
  description:
    "Ofrece un beneficio en Benefizios, gratis. Llega a miles de miembros que buscan dónde gastar cerca de ti.",
};

const ventajas = [
  { icon: "🆓", title: "Sin costo", desc: "Participar es gratis. Solo ofreces el descuento, nunca nos pagas." },
  { icon: "🧲", title: "Más clientes", desc: "Te descubren miembros que ya están buscando dónde gastar cerca." },
  { icon: "🎯", title: "Tú decides", desc: "Tú eliges el descuento, las sucursales y cómo se redime." },
];

export default function NegociosPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 -top-32 h-[520px]">
            <div className="brand-glow absolute inset-0" />
          </div>
          <div className="relative mx-auto max-w-3xl px-5 pb-10 pt-14 text-center sm:px-8 lg:pt-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1 text-xs font-semibold text-ink/70 backdrop-blur">
              Para negocios
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Suma tu negocio a <Brand />
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink/60">
              Ofrece un beneficio y llega a miles de miembros que buscan dónde
              gastar cerca de ti. Gratis, sin comisiones.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {ventajas.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-black/5 bg-white p-5 text-left"
                >
                  <div className="text-2xl">{v.icon}</div>
                  <h3 className="mt-2 font-display text-base font-bold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="rounded-3xl border border-black/5 bg-white p-7 shadow-xl sm:p-9">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
              Carga tu beneficio
            </h2>
            <p className="mt-1 text-sm text-ink/55">
              Lo revisamos y lo publicamos. Te avisamos por correo.
            </p>
            <div className="mt-7">
              <NegociosForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
