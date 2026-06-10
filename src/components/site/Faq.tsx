"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Cuánto cuesta la membresía?",
    a: "Manejamos planes mensuales accesibles. El precio final lo confirmamos al lanzamiento, pero la idea es que un solo beneficio ya cubra el costo del mes.",
  },
  {
    q: "¿Los negocios pagan por participar?",
    a: "No. A diferencia de otras plataformas, los comercios no pagan nada: solo ofrecen el descuento. Eso hace que el modelo sea sostenible y que se sumen más locales.",
  },
  {
    q: "¿Cómo redimo un beneficio?",
    a: "Con tu membresía activa, abrís el cupón en la app y lo mostrás en el local mediante un QR, un código de barras o un texto. La hora en vivo confirma que es válido en el momento.",
  },
  {
    q: "¿Cómo funciona el plan de referidos?",
    a: "Compartís tu link o código QR por WhatsApp, SMS, correo o en persona. Cuando alguien se registra y paga con tu referencia, cobrás un monto fijo directo a tu tarjeta.",
  },
  {
    q: "¿Es seguro pagar con tarjeta?",
    a: "Sí. Encriptamos y almacenamos los datos cumpliendo la norma PCI DSS, con cobros recurrentes a través de una pasarela de pago certificada.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base font-semibold text-ink">
          {q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
        }`}
      >
        <p className="overflow-hidden text-sm leading-relaxed text-ink/60">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="preguntas" className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-semibold text-brand">Preguntas frecuentes</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Lo que solés preguntarte
        </h2>
      </div>

      <div className="mt-10">
        {faqs.map((f) => (
          <Item key={f.q} {...f} />
        ))}
      </div>
    </section>
  );
}
